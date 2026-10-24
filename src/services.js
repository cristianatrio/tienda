import { demoProducts, normalizeProduct } from "./data.js";
export const isDemo = import.meta.env.VITE_DATA_MODE !== "firebase";
let connection;
async function connect() {
  if (!connection)
    connection = (async () => {
      const config = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      };
      if (Object.values(config).some((v) => !v))
        throw new Error("Falta configurar Firebase.");
      const [
        { initializeApp },
        { getFirestore },
        { getAuth },
        { getFunctions },
      ] = await Promise.all([
        import("firebase/app"),
        import("firebase/firestore/lite"),
        import("firebase/auth"),
        import("firebase/functions"),
      ]);
      const app = initializeApp(config);
      if (import.meta.env.VITE_RECAPTCHA_SITE_KEY) {
        const { initializeAppCheck, ReCaptchaV3Provider } =
          await import("firebase/app-check");
        initializeAppCheck(app, {
          provider: new ReCaptchaV3Provider(
            import.meta.env.VITE_RECAPTCHA_SITE_KEY,
          ),
          isTokenAutoRefreshEnabled: true,
        });
      }
      return {
        db: getFirestore(app),
        auth: getAuth(app),
        functions: getFunctions(app, "us-central1"),
      };
    })().catch((error) => {
      connection = undefined;
      throw error;
    });
  return connection;
}
export async function loadCatalog() {
  if (isDemo) return demoProducts;
  const { db } = await connect();
  const { collection, getDocs } = await import("firebase/firestore/lite");
  const snapshot = await getDocs(collection(db, "productos"));
  return snapshot.docs.map((doc) => normalizeProduct(doc.id, doc.data()));
}
export async function placeOrder(buyer, items, requestId) {
  if (isDemo) return { id: `DEMO-${requestId.slice(0, 8).toUpperCase()}` };
  const { auth, functions } = await connect();
  const [{ signInAnonymously }, { httpsCallable }] = await Promise.all([
    import("firebase/auth"),
    import("firebase/functions"),
  ]);
  if (!auth.currentUser) await signInAnonymously(auth);
  const result = await httpsCallable(
    functions,
    "createOrder",
  )({ buyer, items, requestId });
  return result.data;
}
