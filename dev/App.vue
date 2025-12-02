<script setup>
import LinkPrevue from '../src/LinkPrevue.vue'
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>Link Prevue Demo</h1>
      <p>Beautiful link preview cards with customizable button colors</p>
    </div>

    <div class="demo-grid">
      <div class="demo-section">
        <h2>Button Color Examples</h2>
        <div class="color-examples">
          <!-- Default -->
          <div class="color-example">
            <h3>Default</h3>
            <LinkPrevue 
              url="https://www.github.com" 
              cardWidth="300px"
            />
          </div>
          
          <!-- Blue (name) -->
          <div class="color-example">
            <h3>Blue (name)</h3>
            <LinkPrevue 
              url="https://www.github.com" 
              cardWidth="300px"
              buttonColor="blue"
            />
          </div>
          
          <!-- Green (hex) -->
          <div class="color-example">
            <h3>Green (hex)</h3>
            <LinkPrevue 
              url="https://www.github.com" 
              cardWidth="300px"
              buttonColor="#28a745"
            />
          </div>
          
          <!-- Red (RGB) -->
          <div class="color-example">
            <h3>Red (RGB)</h3>
            <LinkPrevue 
              url="https://www.github.com" 
              cardWidth="300px"
              buttonColor="rgb(220, 53, 69)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.demo-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.demo-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.demo-header p {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin: 0;
}

.demo-grid {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.demo-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.demo-section.full-width {
  width: 100%;
}

.demo-section h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-bottom: 3px solid #3498db;
  padding-bottom: 0.5rem;
}

.color-examples {
  display: flex;
  flex-wrap: nowrap;
  gap: 1.5rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}

.color-example {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.color-example h3 {
  font-size: 1.2rem;
  color: #34495e;
  margin: 0 0 1rem 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-transform: capitalize;
}

.width-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  justify-items: center;
}

@media (max-width: 768px) {
  .demo-container {
    padding: 1rem;
  }

  .demo-header h1 {
    font-size: 2rem;
  }

  .demo-header p {
    font-size: 1rem;
  }

  .color-examples {
    flex-wrap: wrap;
  }

  .tech-grid {
    grid-template-columns: 1fr;
  }

  .width-examples {
    flex-direction: column;
    align-items: center;
  }
}
</style>
