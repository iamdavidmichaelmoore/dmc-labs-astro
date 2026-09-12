export interface Work {
  id: string;
  category: string;
  title: string;
  description: string;
  status: string;
}

export interface NoteTocItem {
  id: string;
  label: string;
}

export type NoteSection =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; id: string; text: string }
  | { type: 'code'; title: string; language: string; code: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] };

export interface BlogPost {
  slug?: string;
  date: string;
  title: string;
  description: string;
  /** Full article heading when distinct from list title */
  articleTitle?: string;
  category?: string;
  toc?: NoteTocItem[];
  sections?: NoteSection[];
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

const selfCorrectionSections: NoteSection[] = [
  {
    type: 'paragraph',
    text: 'LLMs make mistakes. This is obvious. But how much of those mistakes are fundamental limitations of the architecture, and how much are failures of the prompting or fine-tuning process? We set out to answer this question by testing different approaches to self-correction in language models.',
  },
  { type: 'heading', id: 'problem', text: 'The problem' },
  {
    type: 'paragraph',
    text: 'When you ask an LLM a question and it gives a wrong answer, you cannot just ask it again. The model does not remember its previous answer and does not have an internal notion of “I was wrong.” This is the fundamental problem: we want systems that can catch and fix their own errors, but standard language models lack that capability.',
  },
  { type: 'heading', id: 'approaches', text: 'Approaches we tested' },
  {
    type: 'paragraph',
    text: 'We tested three main approaches:',
  },
  {
    type: 'code',
    title: 'verifier-loop.ts',
    language: 'ts',
    code: `const draft = await model.answer(question);
const review = await verifier.check(draft);
const answer = review.valid
  ? draft
  : await model.revise(draft, review.feedback);`,
  },
  {
    type: 'list',
    items: [
      '<strong>Chain-of-thought prompting:</strong> Ask the model to show its reasoning before giving the final answer. This does not directly enable correction, but it makes errors more visible to the user.',
      '<strong>Iterative refinement:</strong> Ask the model to produce an initial answer, then ask it to critique and improve it. This is the most direct form of self-correction.',
      '<strong>External verifier:</strong> Use another model or a rule-based system to check the answer and ask the original model to fix any mistakes found.',
    ],
  },
  {
    type: 'quote',
    text: 'The external verifier approach was by far the most effective, but it requires another model. We need cheaper ways to do this at scale.',
  },
  { type: 'heading', id: 'results', text: 'Results' },
  {
    type: 'paragraph',
    text: 'We tested all three approaches on arithmetic, logic, and multi-step reasoning tasks. Here is what we found:',
  },
  {
    type: 'table',
    headers: ['Approach', 'Accuracy', 'Latency', 'Cost'],
    rows: [
      ['None', '64%', '120ms', '1×'],
      ['Chain-of-thought', '71%', '180ms', '1×'],
      ['Iterative refinement', '78%', '240ms', '1.2×'],
      ['External verifier', '89%', '280ms', '2×'],
    ],
  },
  { type: 'heading', id: 'observations', text: 'Observations' },
  {
    type: 'paragraph',
    text: 'The iterative refinement approach had a surprising effect: it often generated better answers even on the first pass. By asking the model to critique its own work, we got it to think out loud more, which seems to reduce the tendency to be overly confident in wrong answers.',
  },
  {
    type: 'paragraph',
    text: 'The external verifier was the most accurate, but at 2× cost it is not practical for large-scale use. We are currently exploring ways to approximate this with cheaper techniques.',
  },
  { type: 'heading', id: 'next-steps', text: 'Next steps' },
  {
    type: 'paragraph',
    text: 'We are now exploring:',
  },
  {
    type: 'list',
    ordered: true,
    items: [
      'Small verifier models trained specifically for self-correction',
      'Rule-based checkers for specific domains, including arithmetic and code',
      'Fine-tuning models on self-correction tasks',
    ],
  },
  {
    type: 'paragraph',
    text: 'If you are interested in this research, we are sharing our experimental setup and results on GitHub. The code is in an early stage, so expect some rough edges.',
  },
];

export const posts: BlogPost[] = [
  {
    slug: 'self-correction-in-llms',
    date: '2024-07-15',
    title: 'Self-Correction in LLMs',
    articleTitle: 'Self-Correction in LLMs: A Research Note',
    category: 'Research',
    description: 'An exploration into techniques that make LLMs better at catching their own mistakes. We tested several approaches, including chain-of-thought prompting and hierarchical reasoning structures.',
    toc: [
      { id: 'problem', label: 'The problem' },
      { id: 'approaches', label: 'Approaches' },
      { id: 'results', label: 'Results' },
      { id: 'observations', label: 'Observations' },
      { id: 'next-steps', label: 'Next steps' },
    ],
    sections: selfCorrectionSections,
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

export function formatNoteDate(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00Z`);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function getLatestNote(posts: BlogPost[]): BlogPost {
  if (posts.length === 0) {
    throw new Error('getLatestNote requires at least one post');
  }
  const withSlug = posts.find(post => Boolean(post.slug));
  return withSlug ?? posts[0]!;
}

export function getActiveExperiments(works: Work[], limit = 3): Work[] {
  return works.filter(work => work.status === 'Active').slice(0, limit);
}

export function hasNoteContent(post: BlogPost): post is BlogPost & { slug: string; sections: NoteSection[] } {
  return Boolean(post.slug && post.sections && post.sections.length > 0);
}
