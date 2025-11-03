import { Brain } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="flex items-center justify-center gap-3 hover:opacity-80 transition-opacity">
          <div className="bg-gradient-primary p-2 rounded-xl">
            <Brain className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-foreground">PostifyAI</h1>
            <p className="text-xs text-muted-foreground">Transforme Pesquisas em Posts do LinkedIn</p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
