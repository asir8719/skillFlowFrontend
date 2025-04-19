import React from 'react'

const BackTop = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '1rem', position:'fixed', bottom:'2rem', right:'1rem', zIndex:'1000' }}>
  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ padding: '0.5rem 1rem', backgroundColor: '#1cdd00', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>
    Back to Top
  </button>
</div>
  )
}

export default BackTop