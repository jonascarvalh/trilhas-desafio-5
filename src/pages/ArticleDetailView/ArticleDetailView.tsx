import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './ArticleDetailView.module.css';

const ArticleDetailView: React.FC = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/path-view');
    };

    return (
        <div>
            <Header />
            <section className={styles.articleDetailViewSection}>
                <h2 className={styles.sectionTitle}>A História da Inteligência Artificial</h2>
                <h3 className={styles.sectionSubtitle}>(Para quem está recomeçando com a tecnologia ao seu lado)</h3>

                <div className={styles.articleDetailViewContent}>
                    Guilherme soltou uma risadinha. "Inteligência o quê?"

                    "Inteligência artificial. Tipo aquelas ferramentas que escrevem textos sozinhas, criam imagens, organizam dados... Muita gente tá usando isso pra trabalhar de casa, ganhar dinheiro, ou facilitar tarefas chatas."

                    Foi ali que algo acendeu nele. Não era só curiosidade. Era a sensação de que talvez houvesse uma nova forma de colocar sua experiência no mundo – agora com uma ajudinha digital.

                    De onde veio essa tal de Inteligência Artificial?
                    A ideia de criar máquinas que "pensam" como humanos é antiga. Bem antes dos computadores, já havia histórias de autômatos – bonecos mecânicos que imitavam gestos humanos. Mas foi só no século XX que isso começou a virar realidade.

                    Na década de 1950, um matemático chamado Alan Turing fez uma pergunta ousada: será que uma máquina pode pensar? Ele criou um teste que ficou famoso – o "Teste de Turing" – para avaliar se um computador conseguiria "conversar" com uma pessoa sem ser percebido como máquina.

                    Mas o termo "inteligência artificial" só foi usado pela primeira vez em 1956, em uma conferência nos Estados Unidos. A ideia era simples e grandiosa: ensinar computadores a aprender, resolver problemas e tomar decisões, como se fossem humanos.

                    Na prática, isso levou muitos anos para começar a dar certo. Nos anos 1970 e 80, a tecnologia ainda era lenta e cara. Mas, com o tempo, os computadores ficaram mais potentes, a internet chegou e, principalmente, apareceram grandes volumes de dados – o "alimento" das inteligências artificiais.

                    O que mudou nos últimos anos?
                    A grande virada veio com o que chamamos hoje de IA generativa. É um tipo de inteligência artificial capaz de criar coisas: textos, imagens, músicas, até vídeos. Ferramentas como o ChatGPT (que você está lendo agora), o DALL·E (que cria imagens a partir de descrições), e outras, viraram populares a partir de 2022.

                    Agora, qualquer pessoa com acesso à internet pode conversar com uma IA, pedir ajuda para montar um currículo, escrever um e-mail, criar uma logomarca ou até planejar um pequeno negócio. É como ter um assistente digital que nunca dorme.

                    🧠 Curiosidade útil:
                    O termo "prompt" é muito usado em ferramentas de IA. Ele significa a instrução ou pedido que você faz. Por exemplo: "Escreva um texto de venda para um bolo caseiro" é um prompt. Quanto mais claro o seu pedido, melhor será a resposta da IA.

                    Mas... como isso pode me ajudar?
                    Se você já tem alguma habilidade – costura, jardinagem, conserto de aparelhos, culinária, vendas – a IA pode te ajudar a transformar isso em algo mais rentável. Por exemplo, ela pode:

                    Criar posts para redes sociais de forma automática;

                    Gerar ideias de nomes para produtos ou serviços;

                    Escrever anúncios ou descrições de itens para vender online;

                    Sugerir estratégias de divulgação para atrair clientes.

                    Guilherme, lembra dele? Depois daquela conversa com a neta, ele começou a explorar por conta própria. Criou um pequeno blog com dicas de manutenção elétrica e usou uma IA para revisar seus textos. Depois, começou a gravar vídeos simples explicando temas básicos. Com ajuda da IA, gerava os roteiros em segundos. Hoje, ele vende consultorias online para empresas pequenas que precisam revisar a rede elétrica de seus estabelecimentos.

                    💡 Dica rápida:
                    Muitos sites que usam IA têm versões gratuitas com limite de uso por mês. Você pode começar testando sem gastar nada. Basta criar uma conta e experimentar.

                    A IA vai tomar o lugar dos humanos?
                    Essa é uma dúvida muito comum. A resposta curta: não. A IA é uma ferramenta, não um substituto. Assim como a calculadora não acabou com os contadores, ou o GPS não eliminou os motoristas, a IA veio para ajudar.

                    Ela é boa em coisas repetitivas, organizadas, baseadas em dados. Mas criatividade, empatia, experiência de vida, tomada de decisão com base em contexto humano – isso tudo ainda é com a gente.

                    Pessoas com mais de 40 anos, aliás, têm uma vantagem enorme: sabem lidar com gente, têm repertório de vida e visão prática. A IA é como uma bicicleta elétrica: ela te dá um impulso, mas quem pedala e decide o caminho é você.

                    Resumo e próximos passos
                    Você viu que a inteligência artificial não é um "bicho de sete cabeças". Ela tem raízes antigas, mas se tornou acessível nos últimos anos. E o mais importante: ela pode ser uma aliada poderosa para você que quer gerar renda, mudar de área ou facilitar tarefas do dia a dia.

                    Comece com calma. Explore ferramentas simples. Use sua experiência como guia. Você não precisa saber tudo – só precisa saber pedir ajuda (dos humanos ou das máquinas).

                    E se em algum momento bater aquela dúvida – como no começo bateu no Guilherme – lembre que cada passo conta. A tecnologia pode parecer assustadora à primeira vista, mas ela foi feita para servir às pessoas. Inclusive, às que já viveram o bastante para saber que nenhum futuro é impossível de recomeçar.

                    Próximos passos sugeridos:

                    Experimente conversar com uma IA simples, como o ChatGPT gratuito;

                    Pense em algo que você sabe fazer bem e imagine como a IA poderia te ajudar a mostrar isso para mais pessoas;

                    No próximo artigo, vamos te mostrar como usar uma ferramenta de IA para criar conteúdo e divulgar um serviço ou produto. Fique por aqui – tem muito mais por vir.
                </div>
                
                <button className={styles.backButton} onClick={handleBackClick}>
                    Voltar
                </button>
            </section>
            <Footer />
        </div>
    )
}

export default ArticleDetailView;