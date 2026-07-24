const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ── Products Registry ──────────────────────────────────
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

// ── Routes ─────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Global Top Group API',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Get all products
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    count: PRODUCTS.length,
    products: PRODUCTS,
  });
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  const product = PRODUCTS.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, product });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`✅ Global Top Group API running on http://localhost:${PORT}`);
  console.log(`   → Health: http://localhost:${PORT}/api/health`);
  console.log(`   → Products: http://localhost:${PORT}/api/products`);
});

module.exports = app;
