import { getCloudinaryUrl } from "../config/cloudinary";

const TestPage = () => {
  // Usar los nombres exactos que aparecen en Cloudinary
  const logoMain = getCloudinaryUrl("nombre_logo-azulgris_nfrpsw");
  const logoIcon = getCloudinaryUrl("logo-azulgris_spk9wg");
  const logoWhite = getCloudinaryUrl("logo-blanco_n7psmk");

  console.log("URLs generadas:");
  console.log("Main:", logoMain);
  console.log("Icon:", logoIcon);
  console.log("White:", logoWhite);

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Cloudinary Logo Test</h1>

      <div className="flex gap-4 items-center">
        <img src={logoMain} alt="Logo Main" className="w-24 h-auto" />
        <img src={logoIcon} alt="Logo Icon" className="w-12 h-auto" />
        <div className="bg-black p-4">
          <img src={logoWhite} alt="Logo White" className="w-24 h-auto" />
        </div>
      </div>
    </div>
  );
};

export default TestPage;
