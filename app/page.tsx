'use client'

import React, { useState, useEffect } from 'react'
import { Upload, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

interface AnalysisResult {
  title: string
  summary: string
  problemStatement: string
  methodology: string
  results: string
  conclusion: string
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Supabase user state
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [userLoading, setUserLoading] = useState(true)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
      setResult(null)
    }
  }

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select a file first')
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to analyze the file')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
      setError(null)
      setResult(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  // Supabase functions
  const fetchUsers = async () => {
    const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false })
    if (error) console.error('Fetch users error:', error)
    else setUsers(data || [])
    setUserLoading(false)
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const { error } = await supabase.from('users').insert([{ name }])
    if (error) {
      console.error('Insert user error:', error)
      alert('Failed to insert user.')
    } else {
      setName('')
      fetchUsers()
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Research Paper Analyzer
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Upload your research paper and get instant AI-powered analysis with key insights,
          methodology breakdown, and comprehensive summaries.
        </p>
      </div>

      {/* File Upload Section */}
      <div className="card mb-8">
        <div className="text-center">
          <div
            className={`border-2 border-dashed rounded-lg p-8 mb-6 transition-colors ${
              file ? 'border-primary-400 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900">
                {file ? file.name : 'Drop your research paper here'}
              </p>
              <p className="text-gray-500">
                {file ? 'File selected successfully' : 'or click to browse'}
              </p>
            </div>
            <input
              type="file"
              accept=".txt,.doc,.docx,.pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="btn-primary inline-block mt-4 cursor-pointer"
            >
              Choose File
            </label>
          </div>

          {file && (
            <div className="flex items-center justify-center space-x-2 text-green-600 mb-4">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">{file.name}</span>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!file || isAnalyzing}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <FileText className="h-5 w-5 mr-2" />
                Analyze Paper
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Title</h3>
            <p className="text-gray-700">{result.title}</p>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Summary</h3>
            <p className="text-gray-700 leading-relaxed">{result.summary}</p>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Problem Statement</h3>
            <p className="text-gray-700 leading-relaxed">{result.problemStatement}</p>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Methodology</h3>
            <p className="text-gray-700 leading-relaxed">{result.methodology}</p>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Results</h3>
            <p className="text-gray-700 leading-relaxed">{result.results}</p>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Conclusion</h3>
            <p className="text-gray-700 leading-relaxed">{result.conclusion}</p>
          </div>
        </div>
      )}

      {/* Features Section */}
      {!result && !isAnalyzing && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Why Use Our Research Paper Analyzer?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Analysis</h3>
              <p className="text-gray-600">
                Get comprehensive analysis of your research papers in seconds, not hours.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Insights</h3>
              <p className="text-gray-600">
                Advanced AI extracts key information, methodology, and findings automatically.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Multiple Formats</h3>
              <p className="text-gray-600">
                Supports TXT, DOC, DOCX, and PDF files for maximum compatibility.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Supabase Users Section */}
      <div className="mt-16 border-t pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Submissions</h2>

        <form onSubmit={handleAddUser} className="flex gap-2 mb-6 max-w-md">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="border p-2 flex-grow rounded"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>

        {userLoading ? (
          <p>Loading users...</p>
        ) : users.length > 0 ? (
          <ul className="space-y-2">
            {users.map((user: any) => (
              <li key={user.id} className="p-2 border rounded-md">
                <strong>{user.name}</strong> — {new Date(user.created_at).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No users yet. Be the first!</p>
        )}
      </div>
      <footer className="mt-16 text-center text-gray-500 text-sm">
       Made with ❤️ by Haseeb
      </footer>

    </div>
  )
}
