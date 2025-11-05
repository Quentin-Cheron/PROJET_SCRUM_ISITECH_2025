
export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F2E8DC' }}>

      <div className="max-w-7xl mx-auto">
        {/* About Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center justify-items-center">
            <div className="space-y-6 max-w-xl mx-auto flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 text-center">À propos de moi</h2>
              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                Je suis Tahri Youcef, Coach Thérapeute en cabinet privé Synégo depuis 3 ans, passionné par le potentiel de transformation qui sommeille en chacun de nous.
                Mon approche est unique : elle combine la rigueur du coaching centré sur l'action, les objectifs et l'avenir 
                avec la profondeur et la bienveillance de la thérapie, permettant de dénouer les blocages émotionnels et les schémas limitants ancrés dans le passé.
              </p>
            </div>
            <div className="bg-gray-100 rounded-xl p-6 overflow-hidden max-w-md w-full">
              <img
                src="portrait.png"
                alt="YoucefTahri - Formateur et Coach"
                className="w-full h-[300px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          {/* Statistiques Section */}
          <div className="mt-16 bg-blue-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">En quelques chiffres</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: '#0A1D35' }}>5</div>
                <div className="text-lg text-gray-700">années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: '#0A1D35' }}>50+</div>
                <div className="text-lg text-gray-700">clients satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: '#0A1D35' }}>3</div>
                <div className="text-lg text-gray-700">diplômes spécialisés</div>
              </div>
            </div>
          </div>

          {/* Formations Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Mes Disciplines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Formation 1 - Connaissance de soi */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-blue-600 mb-4 text-4xl">�</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">La connaissance de soi</h3>
                <p className="text-gray-600 mb-4">Révéler la nature profonde de votre être</p>
                <div className="text-sm text-gray-500">
                  <p>• MBTI, Ennéagramme, Process Com</p>
                  <p>• Archétypes, dialogue pédagogique</p>
                  <p>• Gestion d'apprentissage personnalisée</p>
                  <p className="mt-4 text-gray-600 italic">Comprendre vos mécanismes, vos motivations et votre fonctionnement unique pour être aligné.</p>
                </div>
              </div>

              {/* Formation 2 - Équilibre émotionnel */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-blue-600 mb-4 text-4xl">🧘</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Équilibre émotionnel</h3>
                <p className="text-gray-600 mb-4">Apaiser l'esprit et l'émotionnel</p>
                <div className="text-sm text-gray-500">
                  <p>• Hypnothérapie certifiée</p>
                  <p>• Sophrologie et EFT</p>
                  <p>• Techniques de dialogue intérieur</p>
                  <p className="mt-4 text-gray-600 italic">Libérer les blocages, gérer le stress et l'anxiété, retrouver la sérénité et la clarté mentale.</p>
                </div>
              </div>

              {/* Formation 3 - Harmonie corporelle */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-blue-600 mb-4 text-4xl">🌟</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Harmonie corporelle</h3>
                <p className="text-gray-600 mb-4">Restaurer le flux énergétique</p>
                <div className="text-sm text-gray-500">
                  <p>• Acupuncture certifiée</p>
                  <p>• Techniques Shiatsu</p>
                  <p>• Massage Tuina thérapeutique</p>
                  <p className="mt-4 text-gray-600 italic">Relancer l'énergie vitale, soulager les tensions physiques, améliorer le sommeil et le bien-être général.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Avis Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Avis</h2>
              <p className="text-lg font-normal text-gray-700 mb-2 text-center">Nous avons eu de nombreux avis concernant notre cabinet nous donnant une moyenne de</p>
              <div className="flex justify-center mb-6" aria-hidden="true">
                <div className="inline-flex items-center text-yellow-500 text-3xl space-x-1">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>☆</span>
                </div>
              </div>
              <span className="sr-only">4,5 sur 5 étoiles</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Avis 1 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">A</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900">Alice Martin</h3>
                      <span className="text-sm text-gray-500">— Cliente</span>
                    </div>
                    <div className="mt-2 flex items-center text-yellow-500">
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span>
                    </div>
                    <p className="mt-4 text-gray-600">"Grâce aux séances avec Youcef j'ai retrouvé confiance en moi et appris des outils concrets pour gérer mon anxiété. Professionnel et à l'écoute."</p>
                  </div>
                </div>
              </div>

              {/* Avis 2 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">B</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900">Benoît Durand</h3>
                      <span className="text-sm text-gray-500">— Participant Atelier</span>
                    </div>
                    <div className="mt-2 flex items-center text-yellow-500">
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                    <p className="mt-4 text-gray-600">"Atelier très structuré, des outils pratiques et une atmosphère bienveillante. Je recommande vivement ce cabinet pour le coaching professionnel."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-blue-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contactez-moi</h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Coordonnées */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Mes Coordonnées</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-gray-600">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>10 All. des Champs Elysées, Évry-Courcouronnes (91000)</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>06 13 23 33 43</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>contact@synego.fr</span>
                    </div>
                  </div>
                </div>

                {/* Horaires */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Horaires d'ouverture</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between items-center py-1 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                      <span className="font-medium">Lundi</span>
                      <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">9h-12h | 18h-22h</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                      <span className="font-medium">Mardi</span>
                      <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">9h-12h | 18h-22h</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                      <span className="font-medium">Jeudi</span>
                      <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">9h-12h | 18h-22h</span>
                    </div>
                    <div className="flex justify-between items-center py-1 hover:bg-gray-50 transition-colors duration-200">
                      <span className="font-medium">Dimanche</span>
                      <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">9h-12h | 18h-22h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}