import { Article } from "@/types/article";

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Attention Is All You Need: A Comprehensive Analysis of Transformer Architecture",
    authors: ["Vaswani, A.", "Shazeer, N.", "Parmar, N.", "Uszkoreit, J."],
    date: "2024-01-15",
    abstract: "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train. Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles, by over 2 BLEU.",
    url: "https://arxiv.org/abs/1706.03762"
  },
  {
    id: "2",
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    authors: ["Devlin, J.", "Chang, M.", "Lee, K.", "Toutanova, K."],
    date: "2024-01-14",
    abstract: "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers.",
    url: "https://arxiv.org/abs/1810.04805"
  },
  {
    id: "3",
    title: "GPT-4 Technical Report: Advances in Large Language Models",
    authors: ["OpenAI Team"],
    date: "2024-01-13",
    abstract: "We report the development of GPT-4, a large-scale, multimodal model which can accept image and text inputs and produce text outputs. While less capable than humans in many real-world scenarios, GPT-4 exhibits human-level performance on various professional and academic benchmarks.",
    url: "https://arxiv.org/abs/2303.08774"
  },
  {
    id: "4",
    title: "Diffusion Models: A Comprehensive Survey of Methods and Applications",
    authors: ["Yang, L.", "Zhang, Z.", "Song, Y.", "Hong, S."],
    date: "2024-01-12",
    abstract: "Diffusion models have emerged as a powerful new family of deep generative models with record-breaking performance in many applications, including image synthesis, video generation, and molecule design. In this survey, we review the rapidly expanding body of work on diffusion models.",
    url: "https://arxiv.org/abs/2209.00796"
  },
  {
    id: "5",
    title: "LLaMA: Open and Efficient Foundation Language Models",
    authors: ["Touvron, H.", "Lavril, T.", "Izacard, G.", "Martinet, X."],
    date: "2024-01-11",
    abstract: "We introduce LLaMA, a collection of foundation language models ranging from 7B to 65B parameters. We train our models on trillions of tokens, and show that it is possible to train state-of-the-art models using publicly available datasets exclusively.",
    url: "https://arxiv.org/abs/2302.13971"
  },
  {
    id: "6",
    title: "Segment Anything: A Foundation Model for Image Segmentation",
    authors: ["Kirillov, A.", "Mintun, E.", "Ravi, N.", "Mao, H."],
    date: "2024-01-10",
    abstract: "We introduce the Segment Anything (SA) project: a new task, model, and dataset for image segmentation. Using our efficient model in a data collection loop, we built the largest segmentation dataset to date, with over 1 billion masks on 11M licensed and privacy respecting images.",
    url: "https://arxiv.org/abs/2304.02643"
  },
  {
    id: "7",
    title: "Constitutional AI: Harmlessness from AI Feedback",
    authors: ["Bai, Y.", "Kadavath, S.", "Kundu, S.", "Askell, A."],
    date: "2024-01-09",
    abstract: "We propose a method for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs. The method, which we call Constitutional AI (CAI), involves both a supervised learning and a reinforcement learning phase.",
    url: "https://arxiv.org/abs/2212.08073"
  },
  {
    id: "8",
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    authors: ["Hu, E.", "Shen, Y.", "Wallis, P.", "Allen-Zhu, Z."],
    date: "2024-01-08",
    abstract: "We propose Low-Rank Adaptation, or LoRA, which freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture, greatly reducing the number of trainable parameters for downstream tasks.",
    url: "https://arxiv.org/abs/2106.09685"
  }
];
