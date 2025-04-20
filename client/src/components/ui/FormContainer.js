const FormContainer = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">{children}</div>
    </div>
  )
}

export default FormContainer
