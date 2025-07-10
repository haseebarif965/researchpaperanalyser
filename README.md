# Research Paper Analyzer

A modern Next.js application that provides AI-powered analysis of research papers. Upload your research papers and get instant insights including summaries, methodology breakdown, key findings, and conclusions.

## Features

- **AI-Powered Analysis**: Uses OpenAI's GPT-4 to extract key information from research papers
- **Fallback System**: Works even without OpenAI API key using intelligent text parsing
- **Multiple File Formats**: Supports TXT, DOC, DOCX, and PDF files
- **Beautiful UI**: Modern, responsive design with drag-and-drop file upload
- **Real-time Processing**: Instant analysis with loading states and error handling

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling
- **AI SDK** - OpenAI integration
- **Lucide React** - Beautiful icons
- **Zod** - Schema validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd research-paper-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional):
```bash
# Copy the example environment file
cp .env.example .env.local

# Add your OpenAI API key (optional)
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Upload a File**: Drag and drop your research paper or click to browse
2. **Analyze**: Click the "Analyze Paper" button
3. **View Results**: Get comprehensive analysis including:
   - Title extraction
   - Summary
   - Problem statement
   - Methodology
   - Results and findings
   - Conclusions

## API Endpoints

### POST /api/analyze

Analyzes a research paper file and returns structured data.

**Request:**
- Method: `POST`
- Body: `FormData` with `file` field
- File types: `.txt`, `.doc`, `.docx`, `.pdf`

**Response:**
```json
{
  "title": "Paper title",
  "summary": "Comprehensive summary...",
  "problemStatement": "Research problem...",
  "methodology": "Research methods...",
  "results": "Key findings...",
  "conclusion": "Conclusions..."
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI-powered analysis | No (fallback available) |

## How It Works

### With OpenAI API Key
1. File is uploaded and text is extracted
2. Text is sent to OpenAI GPT-4 with structured schema
3. AI analyzes and returns structured data
4. Results are displayed in the UI

### Without OpenAI API Key (Fallback)
1. File is uploaded and text is extracted
2. Intelligent text parsing identifies sections
3. Key information is extracted using pattern matching
4. Results are displayed in the UI

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

```
├── app/
│   ├── api/analyze/route.ts    # API endpoint
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page
├── public/                     # Static assets
├── package.json                # Dependencies
├── tailwind.config.js          # Tailwind config
├── tsconfig.json               # TypeScript config
└── README.md                   # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support, please open an issue on GitHub or contact the development team. 