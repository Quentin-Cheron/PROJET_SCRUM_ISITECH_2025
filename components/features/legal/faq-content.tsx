export default function FaqContent() {
  return (
    <div className="space-y-6 text-[#0A1D35]">
      <div>
        <h3 
          className="text-lg font-bold mb-3"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 700 }}
        >
          Comment se déroule une première séance de thérapie ?
        </h3>
        <p 
          className="text-sm leading-relaxed mb-4"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          La première séance est un moment d'échange où nous faisons connaissance. C'est l'occasion de discuter de ce qui vous amène, 
          de vos attentes et de vos objectifs. Cette rencontre permet d'établir un climat de confiance et de définir ensemble le 
          cadre thérapeutique qui vous conviendra le mieux. La séance dure environ une heure.
        </p>
      </div>

      <div>
        <h3 
          className="text-lg font-bold mb-3"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 700 }}
        >
          Quelle est la fréquence recommandée des séances ?
        </h3>
        <p 
          className="text-sm leading-relaxed mb-4"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          La fréquence des séances est adaptée à chaque personne et dépend de vos besoins. Généralement, nous commençons 
          par un rythme hebdomadaire pour établir une continuité dans le travail thérapeutique. Cette fréquence peut 
          ensuite être ajustée selon votre évolution et vos disponibilités.
        </p>
      </div>

      <div>
        <h3 
          className="text-lg font-bold mb-3"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 700 }}
        >
          Quel est le tarif d'une séance et est-ce remboursé ?
        </h3>
        <p 
          className="text-sm leading-relaxed mb-4"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          Le tarif est de 60€ par séance. Certaines mutuelles prennent en charge partiellement les consultations - 
          n'hésitez pas à vous renseigner auprès de la vôtre. Une facture vous sera systématiquement remise après 
          chaque séance pour faciliter votre demande de remboursement.
        </p>
      </div>

      <div>
        <h3 
          className="text-lg font-bold mb-3"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 700 }}
        >
          Quelles approches thérapeutiques proposez-vous ?
        </h3>
        <p 
          className="text-sm leading-relaxed mb-4"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          Je propose plusieurs approches que nous choisirons selon vos besoins :
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-4 ml-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
          <li>Thérapie comportementale et cognitive (TCC)</li>
          <li>Approche humaniste centrée sur la personne</li>
          <li>EMDR pour le traitement des traumatismes</li>
          <li>Techniques de relaxation et méditation</li>
        </ul>
      </div>

      <div>
        <h3 
          className="text-lg font-bold mb-3"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 700 }}
        >
          Le contenu des séances est-il confidentiel ?
        </h3>
        <p 
          className="text-sm leading-relaxed mb-4"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          Absolument. La confidentialité est un pilier fondamental de la thérapie. Tout ce qui est dit pendant nos séances 
          reste strictement confidentiel, conformément au code de déontologie. Cette confidentialité garantit un espace 
          sécurisant où vous pouvez vous exprimer librement.
        </p>
      </div>

      <div>
        <h3 
          className="text-lg font-bold mb-3"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 700 }}
        >
          Comment annuler ou reporter un rendez-vous ?
        </h3>
        <p 
          className="text-sm leading-relaxed mb-4"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          En cas d'empêchement, merci de me prévenir au moins 48 heures à l'avance par téléphone ou via la plateforme 
          de réservation. Ce délai permet de proposer le créneau à une autre personne. Toute séance non annulée dans 
          ce délai sera facturée, sauf cas de force majeure.
        </p>
      </div>

      <div>
        <h3 
          className="text-lg font-bold mb-3"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontWeight: 700 }}
        >
          Proposez-vous des séances en ligne ?
        </h3>
        <p 
          className="text-sm leading-relaxed mb-4"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          Oui, je propose des séances en visioconférence pour les personnes ne pouvant pas se déplacer ou préférant 
          ce format. La qualité du travail thérapeutique est maintenue en ligne, bien que certaines approches puissent 
          nécessiter des séances en présentiel.
        </p>
      </div>
    </div>
  );
}

