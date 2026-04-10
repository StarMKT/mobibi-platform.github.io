import React, { useEffect } from 'react';
import { CarFront, CircleCheckBig, Headset, MessageCircleMore, ShieldCheck, Wallet } from 'lucide-react';

const WHATSAPP_PHONE = '5511960474488';

export const UberSaoPaulo: React.FC = () => {
  useEffect(() => {
    document.title = 'Aluguel de carros para Uber em São Paulo | Mobibi';
  }, []);

  const whatsappMessage =
    'Olá! Vim pela página de aluguel de carros para Uber em São Paulo no site da Mobibi. Quero saber mais sobre os veículos disponíveis.';
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-red-600 text-white px-8 py-14 md:px-12 md:py-16">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-red-100 mb-4">
                Mobibi Rent a Car
              </p>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
                Aluguel de carros para Uber em São Paulo
              </h1>

              <p className="text-lg md:text-xl text-red-50 max-w-3xl">
                Alugue um carro para trabalhar como motorista de aplicativo com aprovação rápida,
                atendimento ágil e veículos prontos para Uber, 99 e outras plataformas.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-red-600 font-semibold px-6 py-3 rounded-xl hover:bg-red-50 transition"
                >
                  <MessageCircleMore size={20} />
                  Falar no WhatsApp
                </a>

                <a
                  href="/#/reservar"
                  className="inline-flex items-center justify-center gap-2 border border-white/40 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition"
                >
                  <CarFront size={20} />
                  Ver carros disponíveis
                </a>
              </div>
            </div>
          </div>

          <div className="px-8 py-10 md:px-12">
            <div className="grid md:grid-cols-4 gap-5">
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <Headset className="text-red-600 mb-3" size={28} />
                <h2 className="font-semibold text-lg text-gray-900 mb-2">Atendimento rápido</h2>
                <p className="text-gray-600 text-sm">
                  Processo simples e suporte ágil para você começar a trabalhar o quanto antes.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <ShieldCheck className="text-red-600 mb-3" size={28} />
                <h2 className="font-semibold text-lg text-gray-900 mb-2">Frota pronta para app</h2>
                <p className="text-gray-600 text-sm">
                  Veículos pensados para motoristas de aplicativo, com categorias para diferentes perfis.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <Wallet className="text-red-600 mb-3" size={28} />
                <h2 className="font-semibold text-lg text-gray-900 mb-2">Planos semanais</h2>
                <p className="text-gray-600 text-sm">
                  Mais previsibilidade para organizar seu fluxo de trabalho e sua operação.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <MessageCircleMore className="text-red-600 mb-3" size={28} />
                <h2 className="font-semibold text-lg text-gray-900 mb-2">Contato direto</h2>
                <p className="text-gray-600 text-sm">
                  Fale com a Mobibi pelo WhatsApp e tire dúvidas sobre categorias, requisitos e disponibilidade.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Carros ideais para Uber e 99 em São Paulo
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              A Mobibi oferece aluguel de carros para motoristas de aplicativo em São Paulo, com
              opções voltadas para quem deseja economia no dia a dia, mais conforto nas corridas ou
              acesso a categorias superiores. A escolha da categoria certa pode impactar diretamente
              sua experiência, seu ritmo de trabalho e seu potencial de faturamento.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-gray-100 p-6 bg-gray-50">
              <span className="inline-flex px-3 py-1 rounded-full bg-black text-white text-sm font-semibold mb-4">
                X
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Categoria X</h3>
              <p className="text-gray-600">
                Ideal para quem busca economia, praticidade e um carro funcional para o dia a dia
                nas corridas urbanas.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 p-6 bg-gray-50">
              <span className="inline-flex px-3 py-1 rounded-full bg-black text-white text-sm font-semibold mb-4">
                Comfort
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Categoria Comfort</h3>
              <p className="text-gray-600">
                Mais espaço e conforto para motoristas que desejam um veículo mais valorizado nas
                corridas e melhor experiência para o passageiro.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 p-6 bg-gray-50">
              <span className="inline-flex px-3 py-1 rounded-full bg-black text-white text-sm font-semibold mb-4">
                Black
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Categoria Black</h3>
              <p className="text-gray-600">
                Voltada para quem busca uma categoria premium, com veículos de perfil superior e
                maior percepção de valor nas corridas.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="max-w-4xl mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como funciona o aluguel
            </h2>

            <p className="text-gray-600 text-lg">
              A Mobibi simplifica o processo para quem quer começar a trabalhar como motorista de
              aplicativo em São Paulo sem burocracia desnecessária.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-5">
            {[
              'Escolha a categoria ideal para o seu perfil de trabalho.',
              'Entre em contato pelo WhatsApp para verificar disponibilidade.',
              'Envie os dados e documentos solicitados para análise.',
              'Receba o retorno da equipe e alinhe os detalhes da locação.',
              'Retire o veículo e comece a trabalhar com Uber ou 99.'
            ].map((step, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="h-10 w-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold mb-4">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quem pode alugar um carro para Uber
            </h2>

            <p className="text-gray-600 text-lg mb-8">
              O aluguel de carros para Uber em São Paulo pode ser uma ótima alternativa para quem
              quer começar a trabalhar sem comprar um veículo. A análise final depende do perfil e
              dos critérios operacionais da locadora.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              'Motoristas com CNH válida.',
              'Profissionais que desejam trabalhar com Uber, 99 ou apps similares.',
              'Pessoas que procuram um processo mais rápido para começar a rodar.'
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <CircleCheckBig className="text-red-600 mt-0.5 shrink-0" size={22} />
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="max-w-4xl mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perguntas frequentes
            </h2>
            <p className="text-gray-600 text-lg">
              Respostas rápidas para dúvidas comuns de quem procura aluguel de carros para Uber em São Paulo.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Posso usar o carro para Uber e 99?',
                a: 'Sim. A proposta da Mobibi é atender motoristas de aplicativo, incluindo profissionais que atuam com Uber, 99 e outras plataformas.'
              },
              {
                q: 'O aluguel é semanal?',
                a: 'A Mobibi trabalha com planos pensados para facilitar a operação de motoristas de aplicativo, com foco em praticidade e previsibilidade.'
              },
              {
                q: 'Quais categorias posso escolher?',
                a: 'Você pode encontrar veículos organizados em categorias como X, Comfort e Black, conforme disponibilidade da frota.'
              },
              {
                q: 'Como faço para saber quais carros estão disponíveis?',
                a: 'Você pode visualizar as opções no site e falar diretamente com a equipe da Mobibi pelo WhatsApp para confirmar a disponibilidade.'
              }
            ].map((item) => (
              <div key={item.q} className="rounded-2xl border border-gray-100 p-6 bg-gray-50">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 bg-red-600 text-white rounded-3xl shadow-sm overflow-hidden">
          <div className="px-8 py-12 md:px-12 md:py-14">
            <div className="max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pronto para começar?
              </h2>
              <p className="text-lg text-red-50 mb-8">
                Fale com a Mobibi e descubra qual categoria faz mais sentido para seu perfil de
                trabalho como motorista de aplicativo em São Paulo.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-red-600 font-semibold px-6 py-3 rounded-xl hover:bg-red-50 transition"
              >
                <MessageCircleMore size={20} />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};