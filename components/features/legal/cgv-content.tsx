export default function CGVContent() {
  return (
    <div className="space-y-6 text-[#0A1D35]">
      <div>
        <h3 
          className="text-lg font-bold mb-3"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 700 }}
        >
          1. Objet
        </h3>
        <p 
          className="text-sm leading-relaxed mb-4"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          Les présentes Conditions Générales de Vente (CGV) régissent les prestations de services proposées par Synégo, 
          cabinet de bien-être et de développement personnel. Toute réservation ou commande de prestation implique 
          l'acceptation sans réserve des présentes conditions.
        </p>
      </div>

      <div>
        <h3 
          className="text-lg font-bold mb-3"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 700 }}
        >
          2. Prestations
        </h3>
        <p 
          className="text-sm leading-relaxed mb-2"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          Synégo propose les services suivants :
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-4 ml-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
          <li>Accompagnement individuel en développement personnel</li>
          <li>Séances d'acupuncture, shiatsu et tuina</li>
          <li>Ateliers de bien-être et gestion du stress</li>
          <li>Formations et interventions pour entreprises</li>
        </ul>
      </div>

      <div>
        <h3 
          className="text-lg font-bold mb-3"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 700 }}
        >
          3. Réservation et annulation
        </h3>
        <p 
          className="text-sm leading-relaxed mb-2"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          Les réservations peuvent être effectuées par téléphone au 06 13 23 33 43, uniquement par téléphone.
        </p>
        <p 
          className="text-sm leading-relaxed mb-2"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          <strong>Annulation :</strong> Toute annulation doit être effectuée au minimum 48 heures avant la séance. 
          En cas d'annulation tardive (moins de 48h), la séance peut être facturée.
        </p>
      </div>

      <div>
        <h3 
          className="text-lg font-bold mb-3"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 700 }}
        >
          4. Tarifs et paiement
        </h3>
        <p 
          className="text-sm leading-relaxed mb-2"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          Les tarifs sont communiqués lors de la réservation. Le paiement s'effectue par virement bancaire. 
          Pour les entreprises, un devis personnalisé est établi sur demande.
        </p>
      </div>

      <div>
        <h3 
          className="text-lg font-bold mb-3"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 700 }}
        >
          5. Droit de rétractation
        </h3>
        <p 
          className="text-sm leading-relaxed mb-2"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          Conformément à la législation en vigueur, vous disposez d'un délai de 14 jours pour exercer votre droit 
          de rétractation, sauf si la prestation a été entièrement exécutée avec votre accord avant la fin de ce délai.
        </p>
      </div>
    </div>
  );
}

