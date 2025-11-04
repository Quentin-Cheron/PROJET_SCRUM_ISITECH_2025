
export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F2E8DC' }}>

      <div className="max-w-7xl mx-auto">
        {/* About Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">À propos de moi</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Je suis Tahri Youcef, Coach Thérapeute en cabinet privé Synégo depuis 3 ans, passionné par le potentiel de transformation qui sommeille en chacun de nous.
                Mon approche est unique : elle combine la rigueur du coaching centré sur l'action, les objectifs et l'avenir 
                avec la profondeur et la bienveillance de la thérapie, permettant de dénouer les blocages émotionnels et les schémas limitants ancrés dans le passé.
              </p>
            </div>
            <div className="bg-gray-100 rounded-xl p-6 overflow-hidden">
              <img
                src="Img_youcef.jpg"
                alt="YoucefTahri - Formateur et Coach"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          {/* Formations Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Mes Formations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Formation 1 */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-blue-600 mb-4 text-4xl">📚</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Thérapie Cognitive Comportementale</h3>
                <p className="text-gray-600 mb-4">Formation certifiante en RNCP à l'Institut de Psychologie Paris - 2022</p>
                <div className="text-sm text-gray-500">
                  <p>• Techniques d'accompagnement avancées</p>
                  <p>• Gestion des troubles anxieux</p>
                  <p>• Pratiques thérapeutiques modernes</p>
                </div>
              </div>

              {/* Formation 2 */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-blue-600 mb-4 text-4xl">🎓</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Coach Professionnel Certifié</h3>
                <p className="text-gray-600 mb-4">Certification ICF (International Coach Federation) - 2021</p>
                <div className="text-sm text-gray-500">
                  <p>• Coaching individuel et collectif</p>
                  <p>• Développement personnel</p>
                  <p>• Accompagnement au changement</p>
                </div>
              </div>

              {/* Formation 3 */}
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-blue-600 mb-4 text-4xl">🧠</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Hypnothérapie Ericksonienne</h3>
                <p className="text-gray-600 mb-4">Institut Milton H. Erickson - 2023</p>
                <div className="text-sm text-gray-500">
                  <p>• Techniques hypnotiques avancées</p>
                  <p>• Gestion du stress et des émotions</p>
                  <p>• Accompagnement thérapeutique spécialisé</p>
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
                      <span>123 Avenue des Thérapies, 75000 Paris</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>01 23 45 67 89</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Synégo@gmail.com</span>
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

        {/* Footer */}
        <footer className="text-center border-t border-gray-200 pt-8">
          <p className="text-gray-600 mb-4">
            Pour toute information supplémentaire, veuillez nous contacter à l'adresse{" "}
            <a href="mailto:Synégo@gmail.com" className="text-blue-600 hover:text-blue-800 font-medium">
              Synégo@gmail.com
            </a>
          </p>
          <small className="text-gray-500">© 2025 Synégo. Tous droits réservés.</small>
        </footer>
      </div>
    </div>
  );
}