export interface Work {
  id: string;
  category: string;
  title: string;
  description: string;
  status: string;
}

export interface BlogPost {
  slug?: string;
  date: string;
  title: string;
  description: string;
}

export const works: Work[] = [
  {
    id: 'contextual-query-engine',
    category: 'NLP Research',
    title: 'Contextual Query Engine',
    description: 'An open-source query system that understands intent and context across multiple documents. Used by research teams at three universities for literature analysis. Python, Redis, Elasticsearch stack.',
    status: 'Active',
  },
  {
    id: 'multimodal-annotation-studio',
    category: 'AI Tools',
    title: 'Multimodal Annotation Studio',
    description: 'Web-based annotation tool for training vision-language models. Supports collaborative workflows and export to common format for training pipelines. React, Node.js, PostgreSQL.',
    status: 'Active',
  },
  {
    id: 'self-reflecting-language-model',
    category: 'Experiment',
    title: 'Self-Reflecting Language Model',
    description: 'Preliminary exploration into LLMs that can self-correct reasoning chains. Currently testing on arithmetic and logic benchmarks. Custom PyTorch implementation.',
    status: 'Exploring',
  },
  {
    id: 'inference-cluster-optimizer',
    category: 'Infrastructure',
    title: 'Inference Cluster Optimizer',
    description: 'Tool for optimizing model serving infrastructure. Analyzes workloads and recommends scaling strategies. Auto-discovery of available GPU nodes. Built on Kubernetes.',
    status: 'Internal',
  },
  {
    id: 'efficient-attention-patterns',
    category: 'Research',
    title: 'Efficient Attention Patterns',
    description: 'Paper and code on reducing compute in transformer attention mechanisms. Methods achieve 2-3x speedup on standard benchmarks with minimal accuracy loss. Published to arXiv.',
    status: 'Research',
  },
  {
    id: 'small-language-models-edge',
    category: 'Experiment',
    title: 'Small Language Models for Edge',
    description: 'Exploration into fine-tuning small models (7B-13B parameters) for edge deployment. Focus on compression techniques and quantization methods. Testing on mobile devices.',
    status: 'Exploring',
  },
];

export const focusAreas = [
  {
    title: 'Natural Language Processing',
    description: 'Building tools and systems that make language models more practical for real-world tasks. Open-source query engines, annotation tools, and workflow integrations.',
  },
  {
    title: 'Multimodal Reasoning',
    description: 'Systems that can understand and generate across text, images, and code. Research into architectures that maintain coherence across modalities.',
  },
  {
    title: 'AI Efficiency',
    description: 'Exploring techniques to make large models more efficient without losing capability. Research into distillation, quantization, and attention optimization.',
  },
  {
    title: 'Human-AI Collaboration',
    description: 'Interfaces and workflows that make AI assistants more effective for knowledge workers. Focus on transparency, controllability, and user agency.',
  },
];

export const milestones = [
  {
    year: '2022',
    title: 'Lab founded',
    description: 'Started as a side project researching LLM efficiency. First paper on efficient attention mechanisms posted to arXiv.',
  },
  {
    year: '2023',
    title: 'First major release',
    description: 'Released Contextual Query Engine open-source. Used by over 500 researchers worldwide.',
  },
  {
    year: '2024',
    title: 'Multimodal Annotation Studio',
    description: 'Launched web-based annotation tool. Deployed at 3 university research labs for vision-language research.',
  },
];

export const posts: BlogPost[] = [
  {
    slug: 'self-correction-in-llms',
    date: '2024-07-15',
    title: 'Self-Correction in LLMs',
    description: 'An exploration into techniques that make LLMs better at catching their own mistakes. We tested several approaches, including chain-of-thought prompting and hierarchical reasoning structures.',
  },
  {
    date: '2024-06-28',
    title: 'Annotation Studio Metrics',
    description: 'After six months of production use at university labs, we are sharing insights into inter-annotator agreement and quality control mechanisms. The system has reached more than 95% agreement on benchmark datasets.',
  },
  {
    date: '2024-05-12',
    title: 'Efficient Attention: Update',
    description: 'Updating the arXiv paper with additional experiments and fixes. The new results show even better speedups on modern transformer architectures.',
  },
  {
    date: '2024-04-08',
    title: 'Small Models on Mobile',
    description: 'Found that quantized 7B models can run at 4 tokens per second on typical mobile hardware. More testing needed for edge optimization.',
  },
  {
    date: '2024-03-21',
    title: 'Query Engine v2.0',
    description: 'Released Contextual Query Engine v2.0 with improved semantic understanding and faster query processing. Switched from Elasticsearch to vector database for semantic search.',
  },
  {
    date: '2024-02-10',
    title: 'Why We Built the Query Engine',
    description: 'Writing about the problem space: researchers spend too much time searching literature and not enough time doing actual research. We built tools to flip that ratio.',
  },
];
