import React from 'react'

const Dialog = ({ open, onOpenChange, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      } transition-opacity duration-300`}
    >
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => onOpenChange(false)}
      ></div>

      {/* Dialog Content */}
      <div
        className={`relative bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto p-4 ${
          open ? 'scale-100' : 'scale-95 opacity-0'
        } transition-transform duration-300`}
      >
        {children}
      </div>
    </div>
  )
}

const DialogContent = ({ children }) => {
  return <div className="p-4">{children}</div>
}

const DialogHeader = ({ children }) => {
  return <div className="border-b pb-2 mb-4">{children}</div>
}

const DialogTitle = ({ children }) => {
  return <h2 className="text-lg font-semibold">{children}</h2>
}

export { Dialog, DialogContent, DialogHeader, DialogTitle }
