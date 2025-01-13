// src/components/ui/card.jsx
const Card = ({ children, className }) => (
    <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
  
  const CardHeader = ({ children }) => (
    <div className="border-b pb-2 mb-2">{children}</div>
  );
  
  const CardTitle = ({ children }) => (
    <h3 className="text-xl font-bold text-gray-900">{children}</h3>
  );
  
  const CardContent = ({ children }) => (
    <div className="flex-1">{children}</div>
  );
  
  const CardFooter = ({ children }) => (
    <div className="text-sm text-gray-500">{children}</div>
  );
  
  const CardDescription = ({ children }) => (
    <p className="text-sm text-gray-500">{children}</p>
  );
  
  export { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription };
  