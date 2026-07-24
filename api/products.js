// Vercel Serverless Function — GET /api/products
const PRODUCTS = [
  {
    id: 'auto-calling-crm',
    name: 'Auto Calling CRM',
    tagline: 'AI-Powered Customer Relationship & Auto-Calling System',
    category: 'CRM & Sales',
    url: 'https://auto-calling-crm.vercel.app/',
    features: [
      'Automated AI phone calls & follow-ups',
      'Smart lead scoring & pipeline management',
      'Real-time call analytics & transcripts',
      'Multi-channel outreach automation',
      'CRM integration & contact management',
    ],
  },
  {
    id: 'ai-marketing-os',
    name: 'AI Marketing OS',
    tagline: 'Enterprise AI Marketing Operating System',
    category: 'Marketing & AI',
    url: 'https://ai-marketing-os-web.vercel.app/',
    features: [
      'AI CEO, Directors & Specialist org hierarchy',
      'Campaign creation & autonomous management',
      'Multi-platform content & creative factory',
      'Approval workflows with human oversight',
      'Real-time analytics & performance dashboard',
    ],
  },
  {
    id: 'vyaparos-ai',
    name: 'VyaparOS AI',
    tagline: 'Lead se Payment tak — Poora Business Ek Jagah',
    category: 'Business OS',
    url: 'https://vyaparos-ai.vercel.app/',
    features: [
      'CRM with customer lifetime value tracking',
      'GST-ready quotations & invoice conversion',
      'Payment tracking (partial, overdue, advance)',
      'AI assistant for replies, summaries & actions',
      'Revenue, leads & team performance reports',
    ],
  },
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { id } = req.query;

  if (id) {
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.status(200).json({ success: true, product });
  }

  res.status(200).json({
    success: true,
    count: PRODUCTS.length,
    products: PRODUCTS,
  });
}
