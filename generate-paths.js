const fs = require('fs');
const path = require('path');

// Función para procesar el contenido del SVG
function extractPathsFromSVG(svgContent) {
  // Buscar todos los paths usando una expresión regular
  const pathRegex = /<path[^>]*d="([^"]+)"[^>]*>/g;
  const paths = [];
  let match;
  let index = 0;

  while ((match = pathRegex.exec(svgContent)) !== null) {
    // Extraer el atributo d (path data)
    const pathData = match[1];
    
    // Crear un ID único para cada path
    // Podemos identificar la fila y columna basándonos en las coordenadas
    // Por ahora usamos un simple contador
    const id = `path-${index}`;
    
    paths.push({
      id,
      path: pathData
    });
    
    index++;
  }

  return paths;
}

// Función para generar el archivo TypeScript
function generateTypeScriptFile(paths) {
  let content = `export interface PathData {
  id: string;
  path: string;
}

export const logoPathsData: PathData[] = [\n`;

  paths.forEach(path => {
    content += `  { id: "${path.id}", path: "${path.path}" },\n`;
  });

  content += '];\n';
  
  return content;
}

// Ruta al archivo SVG
const svgFilePath = path.join(__dirname, 'public', 'logo', 'modulos.svg');

// Leer el contenido del SVG
fs.readFile(svgFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo SVG:', err);
    return;
  }

  // Extraer paths del SVG
  const paths = extractPathsFromSVG(data);
  console.log(`Se encontraron ${paths.length} paths en el SVG.`);

  // Generar el contenido del archivo TypeScript
  const tsContent = generateTypeScriptFile(paths);

  // Ruta para el archivo de salida
  const outputPath = path.join(__dirname, 'app', 'components', 'logoPathsData.ts');

  // Escribir el archivo
  fs.writeFile(outputPath, tsContent, 'utf8', (err) => {
    if (err) {
      console.error('Error al escribir el archivo TypeScript:', err);
      return;
    }
    
    console.log(`Archivo generado correctamente: ${outputPath}`);
  });
});