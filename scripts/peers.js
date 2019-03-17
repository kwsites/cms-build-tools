
module.exports = function peers (pkg) {

   const peers = Object.keys(pkg.peerDependencies || {})
      .map(lib => `${ lib }@"${ pkg.peerDependencies[lib] }"`)
      .join(' ');

   if (peers.length) {
      console.log('Installing peer dependencies', peers);
      require('child_process')
         .execSync(`npm install --no-save ${ peers }`);
   }


};
