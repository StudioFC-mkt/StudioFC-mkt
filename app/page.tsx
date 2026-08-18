"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { branding } from './config';

const stats = [
  { label: 'Impressões', value: 9200 },
  { label: 'Cliques', value: 540 },
  { label: 'Conversões', value: 14 },
];

const headerMetrics = [
  { value: '+45%', label: 'ROI médio' },
  { value: '8.2K', label: 'faturamento gerado' },
  { value: '3', label: 'clientes ativos' },
];

const featureCards = [
  {
    title: 'Branding & Posicionamento',
    description: 'Construção de marcas fortes e autoridade de mercado no cenário corporativo.',
  },
  {
    title: 'Tráfego Pago & Performance',
    description: 'Campanhas de anúncios direcionadas no Meta, Google e LinkedIn Ads com foco em ROI.',
  },
  {
    title: 'Estratégia de Dados (Data-Driven)',
    description: 'Análise de métricas, comportamento de público e inteligência para tomada de decisões.',
  },
];

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState([0, 0, 0]);
  const [cookieConsent, setCookieConsent] = useState<'accepted' | 'rejected' | 'pending'>('pending');
  const statsRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const companyRef = useRef<HTMLInputElement | null>(null);
  const websiteRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const handleScheduleWhatsApp = () => {
    const phone = '45999769060';
    const message = encodeURIComponent('Olá! Gostaria de agendar uma chamada com a FC Studio.');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    const name = nameRef.current?.value || '';
    const email = emailRef.current?.value || '';
    const company = companyRef.current?.value || '';
    const website = websiteRef.current?.value || '';
    const message = messageRef.current?.value || '';

    if (!name || !email) {
      alert('Por favor, preencha Nome e E-mail');
      return;
    }

    // Enviar para WhatsApp
    const phone = '45999769060';
    const whatsappMessage = encodeURIComponent(
      `Olá! Meu nome é ${name}, sou da empresa ${company || 'N/A'}.\\n\\nMensagem: ${message}\\n\\nSite: ${website || 'N/A'}\\n\\nEntrar em contato: ${email}`
    );
    window.open(`https://wa.me/${phone}?text=${whatsappMessage}`, '_blank');

    // Limpar formulário
    if (nameRef.current) nameRef.current.value = '';
    if (emailRef.current) emailRef.current.value = '';
    if (companyRef.current) companyRef.current.value = '';
    if (websiteRef.current) websiteRef.current.value = '';
    if (messageRef.current) messageRef.current.value = '';
  };

  useEffect(() => {
    const storedChoice = window.localStorage.getItem('fcstudio-cookie-consent');
    if (storedChoice === 'accepted' || storedChoice === 'rejected') {
      setCookieConsent(storedChoice);
    }
  }, []);

  const handleCookieConsent = (choice: 'accepted' | 'rejected') => {
    setCookieConsent(choice);
    window.localStorage.setItem('fcstudio-cookie-consent', choice);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const increments = [12, 3, 1];
    const duration = 1800;
    const start = performance.now();

    const step = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setValues(
        stats.map((stat, index) => Math.round(stat.value * progress * (1 - index * 0.08)))
      );
      if (progress < 1) requestAnimationFrame(step);
      else setValues(stats.map((stat) => stat.value));
    };

    requestAnimationFrame(step);
  }, [visible]);

  return (
    <main className="min-h-screen bg-[#f5f2ee] text-[#3D4A5C]">
      {cookieConsent === 'pending' && (
        <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4">
          <div className="mx-auto max-w-6xl rounded-[1.75rem] border border-[#3D4A5C]/10 bg-[#101b23] p-5 shadow-[0_24px_60px_rgba(16,27,35,0.32)] text-white md:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#F5A623]">Privacidade e cookies</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Usamos cookies para melhorar sua experiência e cumprir a legislação.</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Este site utiliza cookies para personalizar conteúdos, medir desempenho e garantir uma navegação mais segura.
                  Ao continuar, você concorda com o uso de cookies, termos de uso e política de privacidade da FC Studio.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => handleCookieConsent('rejected')}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:border-white/20 hover:text-white"
                >
                  Rejeitar
                </button>
                <button
                  type="button"
                  onClick={() => handleCookieConsent('accepted')}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e1951e]"
                >
                  Aceitar todos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-[#101b23]/40 backdrop-blur-xl">
        <div className="border-b border-white/10 bg-[#101b23]">
          <div className="container mx-auto flex flex-col gap-2 px-4 py-2 text-[10px] text-[#EAEAEA] md:flex-row md:items-center md:justify-between md:text-[11px]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                fcstudiomk@gmail.com
              </span>
              <span>+55 (45) 99976-9060</span>
            </div>
            <div className="flex items-center gap-3 text-[#EAEAEA]/75">
              <span>Atendimento B2B</span>
              <span>•</span>
              <span>Diagnóstico gratuito</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center">
            <Image 
              src={branding.logo.url} 
              alt={branding.logo.alt} 
              width={branding.logo.width} 
              height={branding.logo.height} 
              priority 
              quality={100} 
              unoptimized={branding.logo.unoptimized}
              className="h-14 w-auto md:h-16 object-contain" 
            />
          </div>

          <nav className="hidden items-center gap-6 text-xs font-medium text-white/70 md:flex">
            <a href="#solucoes" className="transition hover:text-white">Soluções</a>
            <a href="#metodologia" className="transition hover:text-white">Metodologia</a>
            <a href="#resultados" className="transition hover:text-white">Resultados</a>
            <a href="#contato" className="transition hover:text-white">Contato</a>
          </nav>

          <button onClick={handleScheduleWhatsApp} className="inline-flex items-center justify-center rounded-full bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#e1951e] md:px-4">
            Agendar call
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#101b23] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,166,35,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(234,234,234,0.12),transparent_18%)]" />
        <div className="container relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] items-center gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="space-y-8">
            <span className="inline-flex rounded-full border border-[#F5A623]/30 bg-[#F5A623]/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[#F5A623]">
              Agência de crescimento digital
            </span>

            <div className="space-y-5">
              <h1 className="max-w-xl text-5xl font-semibold leading-[1.02] md:text-6xl">
                Transformamos dados em posicionamento e crescimento real.
              </h1>
              <p className="max-w-xl text-lg text-white/70">
                Estratégias de tráfego pago, branding e performance pensadas para escalar vendas com clareza, autoridade e retorno mensurável.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="#contato" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-[0_18px_35px_rgba(245,166,35,0.22)] transition hover:-translate-y-0.5 hover:bg-[#e1951e]">
                Agendar diagnóstico gratuito
              </a>
              <a href="#metodologia" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base text-white transition hover:border-primary hover:text-primary">
                Como trabalhamos
              </a>
            </div>

            <div className="grid gap-3 pt-4 sm:grid-cols-3">
              {headerMetrics.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/60">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative mx-auto w-full max-w-[520px] rounded-[2rem] border border-white/10 bg-[#182731]/80 p-6 shadow-[0_28px_60px_rgba(0,0,0,0.24)]">
            <div className="absolute left-6 top-6 h-20 w-20 rounded-[1.5rem] bg-primary/15 blur-2xl" />
            <div className="absolute bottom-10 right-8 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111e29] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-white/50">Painel de tráfego</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">FC Studio</h2>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/75">Premium</span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-[#1d2b36] p-5">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-white/50">Crescimento</p>
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-4xl font-semibold text-white">+214%</p>
                      <p className="mt-1 text-sm text-white/60">ROI médio em campanhas ativas</p>
                    </div>
                    <span className="rounded-full bg-[#0f8f6c]/15 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#7af0c3]">Estável</span>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-white/10 bg-[#1d2b36] p-4">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-white/50">Engajamento</p>
                    <p className="mt-3 text-3xl font-semibold text-white">+38%</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-[#1d2b36] p-4">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-white/50">Tráfego</p>
                    <p className="mt-3 text-3xl font-semibold text-white">+24%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="solucoes" className="dot-grid bg-[#f5f2ee]">
        <div className="container mx-auto py-16">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.36em] text-[#F5A623]">Nossas soluções</p>
            <h2 className="mt-4 text-4xl font-semibold text-[#3D4A5C]">Estratégias para escalar com clareza</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#3D4A5C]/70">
              Da mensagem ao tráfego, conectamos posicionamento, dados e execução para gerar crescimento sustentável e previsível.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featureCards.map((card) => (
              <motion.article key={card.title} whileHover={{ y: -8 }} className="rounded-[2rem] border border-[#3D4A5C]/10 bg-white p-7 shadow-[0_18px_35px_rgba(29,42,52,0.05)]">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5A623]/10 text-lg font-semibold text-[#F5A623]">•</div>
                <h3 className="text-xl font-semibold text-[#3D4A5C]">{card.title}</h3>
                <p className="mt-4 text-[#3D4A5C]/70">{card.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="metodologia" className="bg-[#edf0f2]">
        <div className="container mx-auto py-16">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.36em] text-[#F5A623]">Metodologia</p>
            <h2 className="mt-4 text-4xl font-semibold text-[#3D4A5C]">Como transformamos estratégia em desempenho</h2>
            <p className="mt-4 text-[#3D4A5C]/75">
              Um processo simples, inteligente e orientado a dados para reduzir ruído e elevar conversão.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            {[
              { step: '01', title: 'Imersão & Dados', text: 'Entendimento do negócio e coleta de dados atuais.' },
              { step: '02', title: 'Estratégia & Branding', text: 'Desenho do posicionamento e identidade de mercado.' },
              { step: '03', title: 'Execução & Tração', text: 'Campanhas de tráfego e ações de marketing no ar.' },
              { step: '04', title: 'Otimização', text: 'Ajustes contínuos focados em escala.' },
            ].map((item) => (
              <motion.div key={item.step} whileHover={{ y: -6 }} className="rounded-[2rem] border border-[#3D4A5C]/10 bg-white p-8 shadow-[0_18px_30px_rgba(29,42,52,0.05)]">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-[#F5A623]/10 text-lg font-semibold text-[#F5A623]">{item.step}</span>
                <h3 className="mt-6 text-xl font-semibold text-[#3D4A5C]">{item.title}</h3>
                <p className="mt-3 text-[#3D4A5C]/70">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="resultados" className="dot-grid bg-[#f5f2ee]">
        <div className="container mx-auto py-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.36em] text-[#F5A623]">Simulador de escala</p>
              <h2 className="text-4xl font-semibold text-[#3D4A5C]">Painel dinâmico de performance</h2>
              <p className="max-w-xl text-[#3D4A5C]/75">
                Veja uma simulação de crescimento com métricas em movimento para reforçar nossa abordagem orientada a dados e resultado.
              </p>
            </div>

            <div ref={statsRef} className="rounded-[2rem] border border-[#3D4A5C]/10 bg-[#101b23] p-8 shadow-[0_22px_40px_rgba(16,27,35,0.18)]">
              <div className="grid gap-5">
                {stats.map((item, index) => (
                  <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-[#1a2730] p-5">
                    <p className="text-[10px] uppercase tracking-[0.32em] text-white/60">{item.label}</p>
                    <p className="mt-4 text-5xl font-semibold text-white">{visible ? values[index].toLocaleString('pt-BR') : '0'}</p>
                    <p className="mt-3 text-sm text-white/60">Estimativa de evolução em um caso real de escala.</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="bg-[#101b23] text-white">
        <div className="container mx-auto py-16">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.36em] text-[#F5A623]">Contato</p>
              <h2 className="text-4xl font-semibold text-white">Agende uma conversa com nossa equipe</h2>
              <p className="max-w-xl text-white/70">
                Preencha o formulário para receber uma análise inicial e um diagnóstico de performance focado no crescimento da sua empresa.
              </p>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_24px_50px_rgba(0,0,0,0.18)]">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-white/75">
                  <span>Nome completo</span>
                  <input ref={nameRef} type="text" placeholder="Seu nome" className="w-full rounded-3xl border border-white/10 bg-[#1a2730] px-4 py-4 text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" required />
                </label>
                <label className="space-y-2 text-sm text-white/75">
                  <span>E-mail corporativo</span>
                  <input ref={emailRef} type="email" placeholder="email@empresa.com" className="w-full rounded-3xl border border-white/10 bg-[#1a2730] px-4 py-4 text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" required />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-white/75">
                  <span>Nome da empresa</span>
                  <input ref={companyRef} type="text" placeholder="Nome da empresa" className="w-full rounded-3xl border border-white/10 bg-[#1a2730] px-4 py-4 text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </label>
                <label className="space-y-2 text-sm text-white/75">
                  <span>Site atual (opcional)</span>
                  <input ref={websiteRef} type="url" placeholder="https://" className="w-full rounded-3xl border border-white/10 bg-[#1a2730] px-4 py-4 text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </label>
              </div>
              <label className="space-y-2 text-sm text-white/75">
                <span>Mensagem</span>
                <textarea ref={messageRef} rows={5} placeholder="Conte-nos mais sobre o desafio e objetivos da sua empresa" className="w-full rounded-[1.5rem] border border-white/10 bg-[#1a2730] px-4 py-4 text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </label>
              <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-base font-semibold text-white transition hover:bg-[#e1951e]">
                Enviar mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f2ee] py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.38em] text-[#F5A623]">FAQ</p>
            <h2 className="mt-4 text-4xl font-semibold text-[#3D4A5C]">Perguntas frequentes</h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-5">
            {[
              { question: 'A FC Studio trabalha com empresas de todos os tamanhos?', answer: 'Sim. Atuamos com negócios que já têm operação e precisam escalar vendas, autoridade e eficiência em tráfego, além de empresas em fase de consolidação que querem estruturar melhor um posicionamento no mercado.' },
              { question: 'Vocês fazem estratégia e execução de campanha?', answer: 'Sim. A nossa atuação combina estratégia, posicionamento, criação, análise de dados e execução em canais como Meta Ads, Google Ads e outros canais de aquisição com foco em retorno e crescimento sustentável.' },
              { question: 'Qual o principal diferencial da sua agência?', answer: 'O diferencial está na combinação entre branding, performance e inteligência de dados. Trabalhamos com visão estratégica e execução prática para transformar atenção em conversão e escala.' },
              { question: 'Preciso de contrato fixo ou posso começar com diagnóstico?', answer: 'Você pode começar com um diagnóstico inicial para entender o cenário atual da sua empresa, público, tráfego e oportunidades de crescimento antes de decidir a estrutura ideal de trabalho.' },
              { question: 'Quanto tempo leva para começar a ver resultados?', answer: 'Em geral, o processo de estruturação e posicionamento começa em semanas, enquanto os primeiros sinais de melhoria em tráfego e conversão dependem do canal, da oferta e da maturidade do negócio.' },
              { question: 'Vocês atuam também em branding e posicionamento?', answer: 'Sim. Branding, mensagem, diferenciação e autoridade de mercado fazem parte da nossa metodologia. Muitas empresas precisam primeiro fortalecer a percepção da marca antes de escalar campanhas.' },
            ].map((item) => (
              <div key={item.question} className="rounded-[1.5rem] border border-[#3D4A5C]/10 bg-white p-6 shadow-[0_12px_24px_rgba(29,42,52,0.04)]">
                <h3 className="text-lg font-semibold text-[#3D4A5C]">{item.question}</h3>
                <p className="mt-3 text-[#3D4A5C]/70">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#3D4A5C]/10 bg-[#101b23] py-8">
        <div className="container mx-auto flex flex-col gap-4 text-sm text-[#EAEAEA]/75 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} FC Studio. Todos os direitos reservados.</span>
          <span>Especialistas em marketing digital, tráfego pago e escalabilidade.</span>
        </div>
      </footer>
    </main>
  );
}
