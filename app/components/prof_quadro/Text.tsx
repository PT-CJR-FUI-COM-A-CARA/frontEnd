import ProfQuadro from './Prof';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ProfQuadro
        name="Rick Sanchez"
        area="Segurança Computacional"
        Fotopsrc= "/icones-nav/Mais_icon.png"
      />
    </div>
  );
}
    