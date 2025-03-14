export const isNotNull = (input) => {
  return input !== null || input !== undefined;
};

export const generateGUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const tranformApiData = (data) => {
  try {
    if (data === null || data === undefined) return null;
    const transformedData = {};
    for (const [key, value] of Object.entries(data)) {
      if (value && typeof value === 'object' && ('$ref' in value || '$id' in value)) {
        transformedData[key] = null;
      } else {
        transformedData[key] = value;
      }
    }
    return transformedData;
  } catch (error) {
    return data;
  }
};

export const genSvgColorUrl = (color) => {
  const svgSize = 18;
  const svg = `
    <svg width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.437 17.608 3.354 22.828l8.336 -21.536 8.337 21.536L11.944 17.608l-0.253 -0.163 -0.254 0.163Z" stroke="#545D66" stroke-width="0.9" fill="${color.trim()}"></path>
    </svg>
  `;
  
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}