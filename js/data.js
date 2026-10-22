/* Conteúdo da plataforma de Física */

const MODULES = [
  {
    id: 'queda-livre',
    title: 'Queda Livre e Movimento',
    icon: '🌍',
    description: 'Conceitos de movimento, equações da cinemática e cálculo da queda livre.',
    sections: [
      {
        title: 'Grandezas do movimento',
        paragraphs: [
          'O movimento descreve a mudança da posição de um objeto em relação a um ponto de referência ao longo do tempo.',
          'Para analisar o movimento usamos as grandezas velocidade e aceleração. A aceleração é a variação da velocidade em relação ao tempo, ou seja, quanto mais rápido um corpo se move.'
        ],
        formulas: []
      },
      {
        title: 'Equações da cinemática',
        paragraphs: [
          'São relações que ligam deslocamento, velocidade, aceleração, tempo e velocidade inicial. Com elas é possível calcular qualquer incógnita do movimento.',
          'A primeira relaciona o deslocamento com a velocidade média; a segunda calcula a velocidade final; a terceira permite encontrar o deslocamento sem conhecer o tempo.'
        ],
        formulas: [
          'Δs = v·t + (a·t²)/2',
          'v = v₀ + a·t',
          'v² = v₀² + 2·a·Δs'
        ]
      },
      {
        title: 'Queda livre',
        paragraphs: [
          'Quando um corpo se move sob a ação da gravidade — como uma gota de chuva — sua aceleração é a constante da gravidade, g ≈ 9,8 m/s² no planeta Terra.',
          'Na queda livre o corpo parte do repouso, ou seja, v₀ = 0.'
        ],
        formulas: [
          'h = (g·t²)/2',
          'v = g·t',
          'v² = 2·g·h'
        ]
      }
    ],
    questions: [
      {
        q: 'Um objeto está em queda livre e atinge o solo com uma velocidade final de 19,8 m/s. A altura da queda foi?',
        options: ['9,8 m/s', '19,8 m/s', '39,6 m/s', '98 m/s'],
        answer: 1,
        explanation: 'Use a fórmula da queda livre: v² = 2·g·h. Com v = 19,8 m/s e g = 9,8 m/s², temos h ≈ 20 m.'
      },
      {
        q: 'Um objeto em queda livre da Terra ganha velocidade a 9,8 m/s a cada segundo. Essa intensidade é conhecida como:',
        options: ['Aceleração do objeto', 'Força gravitacional', 'Gravidade (g)', 'Velocidade final'],
        answer: 2,
        explanation: 'Na queda livre a aceleração do movimento é exatamente a gravidade, com g ≈ 9,8 m/s².'
      },
      {
        q: 'Um objeto em queda livre atinge o solo com uma velocidade final de 39,2 m/s. Em quanto tempo de queda ocorreu?',
        options: ['1 s', '2 s', '4 s', '8 s'],
        answer: 2,
        explanation: 'Use a fórmula da queda livre: v = g·t. Logo, t = v/g = 39,2/9,8 = 4 s.'
      },
      {
        q: 'Qual das expressões representa corretamente a velocidade final de um corpo em queda livre que parte do repouso?',
        options: ['v = g·t', 'v = (g·t)²', 'v = g + t', 'v = 2·g·t'],
        answer: 0,
        explanation: 'Para queda livre, a velocidade final é dada por v = g·t, onde t é o tempo de queda.'
      }
    ]
  },
  {
    id: 'leis-newton',
    title: 'Leis de Newton',
    icon: '🚀',
    description: 'As três leis que descrevem a dinâmica: inércia, força resultante e ação e reação.',
    sections: [
      {
        title: 'Primeira lei — Inércia',
        paragraphs: [
          'Um corpo tende a manter seu estado de repouso ou de movimento uniforme retilíneo, a menos que uma força resultante atue sobre ele.'
        ],
        formulas: []
      },
      {
        title: 'Segunda lei — F = m·a',
        paragraphs: [
          'A força resultante é igual à massa do corpo multiplicada pela aceleração. A mesma força produz menor aceleração em corpos mais massivos.',
          'As relações podem ser reorganadas: a = F/m ou m = F/a.'
        ],
        formulas: [
          'F = m·a',
          'a = F/m',
          'm = F/a'
        ]
      },
      {
        title: 'Terceira lei — Ação e Reação',
        paragraphs: [
          'Para toda força aplicada por um corpo sobre outro, existe uma força de mesma intensidade, mesma direção e sentido contrário, aplicada em contrapartida.'
        ],
        formulas: []
      }
    ],
    questions: [
      {
        q: 'Um corpo de 5 kg sofre uma força resultante de 20 N. Qual a sua aceleração?',
        options: ['4 m/s²', '100 m/s²', '5 m/s²', '25 m/s²'],
        answer: 0,
        explanation: 'Aceleração é a razão entre força e massa: a = F/m = 20/5 = 4 m/s².'
      },
      {
        q: 'Se a mesma força resultante de 20 N fosse aplicada a um corpo com o dobro da massa, a nova aceleração seria:',
        options: ['2 m/s²', '10 m/s²', '4 m/s²', '40 m/s²'],
        answer: 0,
        explanation: 'A aceleração é inversamente proporcional à massa: dobrar a massa reduz a aceleração pela metade (de 4 m/s² para 2 m/s²).'
      },
      {
        q: 'De acordo com a terceira lei de Newton, quando você empurra uma parede:',
        options: ['A parede empurra você com força igual e oposta', 'A parede não oferece resistência', 'Você sente a parede apenas com o peso', 'A pessoa não sente nada'],
        answer: 0,
        explanation: 'Para toda ação existe uma reação de mesma intensidade e sentido contrário, atuando no corpo oposto.'
      }
    ]
  },
  {
    id: 'energia',
    title: 'Energia',
    icon: '⚡',
    description: 'Cálculo da energia cinética e potencial e conservação de energia.',
    sections: [
      {
        title: 'Energia cinética',
        paragraphs: [
          'A energia cinética é a energia de movimento de um corpo. Quanto maior a velocidade (ou a massa), maior a energia.',
          'Fórmula: Ec = (m·v²)/2.'
        ],
        formulas: [
          'Ec = (m·v²)/2'
        ]
      },
      {
        title: 'Energia potencial gravitacional',
        paragraphs: [
          'A energia potencial gravitacional é a energia de posição de um corpo em um campo gravitacional. Quanto maior a altura, maior a energia.',
          'Fórmula: Ep = m·g·h.'
        ],
        formulas: [
          'Ep = m·g·h'
        ]
      },
      {
        title: 'Conservação da energia',
        paragraphs: [
          'Em sistemas sem atrito ou perdas, a energia total (cinética + potencial) se conserva: a energia de um formato vira a de outro.'
        ],
        formulas: []
      }
    ],
    questions: [
      {
        q: 'Um objeto de 2 kg está parado a 10 m de altura. Qual a energia potencial gravitacional (g = 10 m/s²)?',
        options: ['20 J', '200 J', '400 J', '2 J'],
        answer: 1,
        explanation: 'Ep = m·g·h = 2·10·10 = 200 J.'
      },
      {
        q: 'Um carro de 1.000 kg se move a 30 m/s. Qual a sua energia cinética?',
        options: ['225.000 J', '450.000 J', '15.000 J', '9.000 J'],
        answer: 1,
        explanation: 'Ec = (m·v²)/2 = (1.000·30²)/2 = 450.000 J.'
      },
      {
        q: 'Qual fórmula calcula corretamente a energia cinética?',
        options: ['Ec = (m·v²)/2', 'Ec = m·g·h', 'Ec = m·v', 'Ec = (m·g·h)/2'],
        answer: 0,
        explanation: 'A energia cinética depende da massa e do quadrado da velocidade: Ec = (m·v²)/2.'
      }
    ]
  },
  {
    id: 'lei-de-ohm',
    title: 'Lei de Ohm',
    icon: '🔌',
    description: 'Relação entre tensão, corrente e resistência nos circuitos elétricos.',
    sections: [
      {
        title: 'Lei de Ohm',
        paragraphs: [
          'A corrente elétrica que passa por um resistor é igual ao produto da tensão pela resistência.',
          'Fórmula: V = R·I.'
        ],
        formulas: [
          'V = R·I'
        ]
      },
      {
        title: 'Relação com a corrente',
        paragraphs: [
          'A corrente é a razão entre tensão e resistência: quanto maior a tensão, maior a corrente (para resistência fixa).',
          'Fórmula: I = V/R.'
        ],
        formulas: [
          'I = V/R'
        ]
      },
      {
        title: 'Relação com a resistência',
        paragraphs: [
          'A resistência é a razão entre tensão e corrente, expressando o impedimento ao fluxo elétrico.',
          'Fórmula: R = V/I.'
        ],
        formulas: [
          'R = V/I'
        ]
      }
    ],
    questions: [
      {
        q: 'Uma bateria de 12 V alimenta um resistor de 4 Ω. Qual a corrente que passa pelo circuito (lei de Ohm)?',
        options: ['3 A', '48 A', '16 A', '0,75 A'],
        answer: 0,
        explanation: 'Corrente: I = V/R = 12/4 = 3 A.'
      },
      {
        q: 'Se a tensão em um circuito é de 9 V e a corrente é de 3 A, qual a resistência?',
        options: ['3 Ω', '27 Ω', '12 Ω', '0,33 Ω'],
        answer: 0,
        explanation: 'Resistência: R = V/I = 9/3 = 3 Ω.'
      }
    ]
  }
];
