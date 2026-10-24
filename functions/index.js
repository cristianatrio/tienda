import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { validateRequest, buildOrder } from "./order.js";
initializeApp();
export const createOrder = onCall(
  { enforceAppCheck: true, maxInstances: 5 },
  async (request) => {
    if (!request.auth)
      throw new HttpsError(
        "unauthenticated",
        "Iniciá una sesión para continuar.",
      );
    let input;
    try {
      input = validateRequest(request.data);
    } catch (e) {
      throw new HttpsError("invalid-argument", e.message);
    }
    const db = getFirestore(),
      orderRef = db
        .collection("ordenes")
        .doc(`${request.auth.uid}_${input.requestId}`);
    return db.runTransaction(async (tx) => {
      const previous = await tx.get(orderRef);
      if (previous.exists) return { id: orderRef.id };
      const refs = input.items.map((x) => db.collection("productos").doc(x.id));
      const snapshots = await tx.getAll(...refs);
      let order;
      try {
        order = buildOrder(
          input.items,
          snapshots.map((s) => (s.exists ? s.data() : null)),
        );
      } catch (e) {
        throw new HttpsError("failed-precondition", e.message);
      }
      order.lines.forEach((line, i) =>
        tx.update(refs[i], { cantidad: line.remaining }),
      );
      tx.create(orderRef, {
        buyer: input.buyer,
        uid: request.auth.uid,
        items: order.lines.map(({ remaining: _, ...line }) => line),
        total: order.total,
        fecha: FieldValue.serverTimestamp(),
        estado: "generada",
      });
      return { id: orderRef.id };
    });
  },
);
