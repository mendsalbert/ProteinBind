const initRDKit = () => {
  return new Promise((resolve, reject) => {
    if (window.RDKit) {
      console.log("RDKit already loaded");
      resolve(window.RDKit);
    } else {
      window
        .initRDKitModule({
          locateFile: () => "/rdkit/RDKit_minimal.wasm",
        })
        .then((RDKit) => {
          console.log("RDKit loaded successfully");
          window.RDKit = RDKit;
          resolve(RDKit);
        })
        .catch((err) => {
          console.error("Failed to load RDKit", err);
          reject(err);
        });
    }
  });
};

export default initRDKit;
