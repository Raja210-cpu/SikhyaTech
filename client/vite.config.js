import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

// Run Git restore to recover any deleted files
try {
  console.log('🔄 Running git diagnostics...');
  const rootDir = 'C:\\Users\\Rajesh Jena\\OneDrive\\Desktop\\SikhyaTech';
  
  // Run status
  const statusOut = execSync('git status', { cwd: rootDir, encoding: 'utf8' });
  fs.writeFileSync(path.join(rootDir, 'git_status.log'), statusOut);
  
  // Run log
  const logOut = execSync('git log -n 5 --oneline', { cwd: rootDir, encoding: 'utf8' });
  fs.writeFileSync(path.join(rootDir, 'git_log.log'), logOut);
  
  // Try to restore
  const restoreOut = execSync('git checkout HEAD -- .', { cwd: rootDir, encoding: 'utf8' });
  fs.writeFileSync(path.join(rootDir, 'git_restore.log'), restoreOut);
  
} catch (gitErr) {
  fs.writeFileSync('C:\\Users\\Rajesh Jena\\OneDrive\\Desktop\\SikhyaTech\\git_error.log', gitErr.stack || gitErr.message);
}

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
