const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = 'https://hhybtkiuoacbtuxgkfgi.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY
const db = createClient(SUPABASE_URL, SUPABASE_KEY)

// Base de devocionais - você pode expandir
const DEVOCIONAIS_BASE = [
  {
    santo: 'Santo Antônio de Lisboa',
    emoji: '🙏',
    versiculo: 'A bondade do Senhor não tem fim e sua misericórdia jamais se esgota. Elas se renovam cada manhã. Sua lealdade é grande.',
    referencia: 'Lamentações 3:22-23',
    reflexao: 'Santo Antônio é conhecido como o santo dos milagres e do amor misericordioso. Assim como Antônio dedicou sua vida ao cuidado dos pobres e necessitados, somos chamados a refletir a bondade divina em nossas ações.\n\nA misericórdia do Senhor se renova a cada manhã. Não importa nossas falhas do dia anterior, Deus nos oferece uma nova oportunidade. Hoje, peça a Deus a graça de viver essa misericórdia, compartilhando-a com quem encontrar no caminho.',
    oracao: 'Senhor Jesus, assim como Santo Antônio intercedeu pelos pobres e sofredores, intercede também por mim. Concede-me o coração generoso e amoroso para reconhecer Tua presença nos meus irmãos. Ajuda-me a viver cada dia com esperança renovada e a partilhar Tua misericórdia com quantos encontrar. Amém.',
    categoria: 'Santos'
  },
  {
    santo: 'São Bernardo de Claraval',
    emoji: '📖',
    versiculo: 'Que melhor presente do que um coração que ama?',
    referencia: 'São Bernardo de Claraval',
    reflexao: 'São Bernardo nos ensina que o amor é o melhor presente que podemos oferecer. Um coração cheio de amor por Deus e pelo próximo é mais valioso do que qualquer riqueza material.\n\nEste é um dia para refletir sobre como estamos amando. Estamos amando com genuinidade? Estamos abrindo nossos corações para o próximo? A vida de São Bernardo nos mostra que uma vida dedicada ao amor é uma vida dedicada a Deus.',
    oracao: 'Meu Deus, abra meu coração para amar como Você ama. Tire de mim a dureza, o egoísmo e o medo. Ensina-me a amar com sinceridade, a servir com alegria e a viver para os outros. Que meu coração seja um presente digno para Você. Amém.',
    categoria: 'Santos'
  },
  {
    santo: 'Santa Joana d\'Arc',
    emoji: '⚔️',
    versiculo: 'Aja e Deus agirá também contigo',
    referencia: 'Santa Joana d\'Arc',
    reflexao: 'Santa Joana d\'Arc nos lembra que a fé não é apenas acreditar, mas agir. Ela não esperou por circunstâncias perfeitas; ela respondeu ao chamado de Deus e agiu com coragem.\n\nMuitas vezes esperamos por sinais, pela coragem perfeita ou pelas circunstâncias certas. Mas Deus espera por nossa ação. Ele promete estar conosco quando nos movemos pela fé.',
    oracao: 'Senhor, concede-me a coragem de Santa Joana d\'Arc. Ajuda-me a não ficar paralisado pelo medo ou pela incerteza. Quero agir conforme minha fé. Quando duvidar, lembra-me que Você estará comigo. Que eu possa fazer a Tua vontade com toda a força que tenho. Amém.',
    categoria: 'Santos'
  },
  {
    santo: 'Nossa Senhora de Fátima',
    emoji: '👑',
    versiculo: 'Rezai para evitar guerras e pedir a paz',
    referencia: 'Nossa Senhora de Fátima',
    reflexao: 'A mãe de Jesus nos pede que rezemos pela paz. A oração é uma arma poderosa contra o mal, a divisão e a guerra.\n\nNeste dia, reflita sobre como a oração pode transformar o mundo. Uma vida de oração não é uma vida passiva; é uma vida que participa da transformação do mundo pelo poder do Espírito Santo.',
    oracao: 'Querida Mãe de Jesus, ajuda-me a rezar com perseverança. Intercede por mim e pelo mundo. Que nossas orações tragam paz onde há conflito, cura onde há ferida, e luz onde há escuridão. Consagro meu coração à sua proteção maternal. Amém.',
    categoria: 'Maria'
  },
  {
    santo: 'São Tiago, o Menor',
    emoji: '✝️',
    versiculo: 'A fé sem obras é morta',
    referencia: 'Tiago 2:26',
    reflexao: 'São Tiago nos lembra uma verdade fundamental: a fé verdadeira se manifesta em ações. Não basta crer em Deus; precisamos viver nossa fé através de obras de caridade e justiça.\n\nQual é o fruto de sua fé? Que obras estão nascendo do seu coração crente? Este é um convite para examinar se nossa fé é viva e ativa.',
    oracao: 'Deus meu, concede-me uma fé viva que se expresse em ações. Ajuda-me a não ser apenas um ouvinte da Palavra, mas um praticante dela. Que minhas obras reflitam meu amor por Ti e por meus irmãos. Amém.',
    categoria: 'Apóstolos'
  },
  {
    santo: 'Santo André',
    emoji: '🎣',
    versiculo: 'Lembrem-se de seus líderes, que lhes falaram a palavra de Deus',
    referencia: 'Hebreus 13:7',
    reflexao: 'Santo André foi o primeiro apóstolo a ser chamado por Jesus. Ele nos ensina a importância de reconhecer e honrar aqueles que nos guiam na fé.\n\nNeste dia, agradeça por todos aqueles que o ajudaram a conhecer Jesus melhor. Ore por seus líderes espirituais. Também considere como você pode ser um líder para outros na sua comunidade.',
    oracao: 'Senhor, agradeço por Santo André e por todos aqueles que pregam Tua Palavra. Abençoa meus líderes espirituais. Também me capacita para ser um guia de fé para aqueles ao meu redor. Que eu sempre aponte para Jesus. Amém.',
    categoria: 'Apóstolos'
  },
  {
    santo: 'Santo Inácio de Loyola',
    emoji: '🕯️',
    versiculo: 'Tudo deve ser para a maior glória de Deus',
    referencia: 'Santo Inácio de Loyola',
    reflexao: 'Santo Inácio dedicou sua vida a buscar a maior glória de Deus em tudo que fazia. Esta é uma chamada para colocar Deus no centro de nossas decisões e ações.\n\nHoje, pergunte-se: Como posso servir à glória de Deus em minhas atividades diárias? Meu trabalho, minha família, meus hobbies—tudo pode glorificar a Deus quando feito com intenção correta.',
    oracao: 'Deus meu, quero viver para Tua glória. Ajuda-me a discernir Tua vontade em todas as coisas. Que cada ação minha seja feita com amor por Ti. Concede-me a sabedoria de Santo Inácio para encontrar Deus em tudo. Amém.',
    categoria: 'Santos'
  }
]

async function gerarDevocionalDodia() {
  console.log('=== Gerar Devocional do Dia ===')
  console.log(`Data: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`)
  console.log('')

  try {
    // Pegar devocional aleatório
    const devocional = DEVOCIONAIS_BASE[Math.floor(Math.random() * DEVOCIONAIS_BASE.length)]

    // Data de hoje
    const hoje = new Date()
    const dataFormatada = hoje.toISOString().split('T')[0]

    console.log(`Santo/a: ${devocional.santo}`)
    console.log(`Data: ${dataFormatada}`)

    // Verificar se já existe devocional hoje
    const { data: existente, error: errCheck } = await db
      .from('devocionais')
      .select('id')
      .eq('data', dataFormatada)
      .single()

    if (existente) {
      console.log('✅ Devocional de hoje já existe. Pulando...')
      return
    }

    // Inserir novo devocional
    const { error } = await db
      .from('devocionais')
      .insert([{
        data: dataFormatada,
        santo: devocional.santo,
        emoji: devocional.emoji,
        versiculo: devocional.versiculo,
        referencia: devocional.referencia,
        reflexao: devocional.reflexao,
        oracao: devocional.oracao,
        categoria: devocional.categoria
      }])

    if (error) {
      console.error('❌ Erro ao inserir:', error.message)
      process.exit(1)
    }

    console.log('✅ Devocional inserido com sucesso!')
    console.log('')
  } catch (err) {
    console.error('❌ Erro:', err.message)
    process.exit(1)
  }
}

gerarDevocionalDodia()
