'use client'

export default function CSSTest() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          CSS Test Page
        </h1>
        
        {/* Basic Tailwind Test */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Basic Tailwind</h2>
            <p className="text-gray-600">This card uses standard Tailwind classes.</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Click Me
            </button>
          </div>
          
          {/* Neomorphism Test */}
          <div className="neu-card">
            <h2 className="text-xl font-semibold mb-4">Neomorphism Card</h2>
            <p className="text-gray-600">This card uses custom neu-card class.</p>
            <button className="neu-button mt-4">
              Neu Button
            </button>
          </div>
          
          {/* Variables Test */}
          <div style={{ 
            backgroundColor: 'var(--surface)', 
            color: 'var(--text)',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '8px 8px 16px var(--shadow-dark), -8px -8px 16px var(--shadow-light)'
          }}>
            <h2 className="text-xl font-semibold mb-4">CSS Variables</h2>
            <p>This card uses inline CSS variables.</p>
            <div className="gradient-text mt-4 text-lg font-bold">
              Gradient Text
            </div>
          </div>
        </div>
        
        {/* Color Variables Display */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">CSS Variables Test</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div 
                className="w-16 h-16 rounded mb-2" 
                style={{ backgroundColor: 'var(--primary)' }}
              ></div>
              <span className="text-sm">Primary</span>
            </div>
            <div>
              <div 
                className="w-16 h-16 rounded mb-2" 
                style={{ backgroundColor: 'var(--primary-dark)' }}
              ></div>
              <span className="text-sm">Primary Dark</span>
            </div>
            <div>
              <div 
                className="w-16 h-16 rounded mb-2" 
                style={{ backgroundColor: 'var(--success)' }}
              ></div>
              <span className="text-sm">Success</span>
            </div>
            <div>
              <div 
                className="w-16 h-16 rounded mb-2" 
                style={{ backgroundColor: 'var(--error)' }}
              ></div>
              <span className="text-sm">Error</span>
            </div>
          </div>
        </div>
        
        {/* Input Test */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Form Elements Test</h2>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Standard input" 
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <input 
              type="text" 
              placeholder="Neomorphism input" 
              className="neu-input w-full"
            />
            <button className="neu-button-primary">
              Primary Button
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
