<template>
  <div class="container">
    <div class="content">
      <div id="form-title" />
      <form>
        <header>
          <h1>Novo produto</h1>
        </header>
        <div id="input-group">
          <label for="name">Nome do produto : </label>
          <input type="text" />
          <label for="quantity">Quantidade : </label>
          <input type="number" min="0" />
          <label for="image">Imagem do produto : </label>
          <input type="file" readonly />
          <label for="category">Categoria : </label>
          <select id="category-select" name="category">
            <option>Software</option>
            <option>Hardware</option>
          </select>
          <label for="price">Preço : </label>
          <input type="number" min="1.00" step="1.00" />
        </div>

        <button type="submit">Criar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
  overflow: hidden;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.container {
  width: 100vw;
  height: 100vh;
  background: #e3e3e3;
}
.container .content {
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  display: flex;

  background: url("https://res.cloudinary.com/jvfaria015/image/upload/v1598458352/OWlogo_uosqlw.png")
    no-repeat center right;
  background-size: auto;
}
.container .content form header {
  margin-bottom: 90px;
}
.container .content form header h1 {
  font: bold 48px Poppins;
}
.container .content form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 0 auto;
  margin-left: 0;
}
.container .content form #input-group {
  width: 300px;
  margin-bottom: 30px;
}

input {
  width: 100%;
  height: 38px;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-top: 5px;
  padding: 25px;
  background-color: #FFF;
  box-sizing: border-box;
  outline: 0;

  font: 400 14px Poppins;
}
select {
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 5px;
  margin-bottom: 5px;
  margin-top: 5px;
  padding-left: -20px;
  padding: 5px;
  background-color: #FFF;
  box-sizing: border-box;
  outline: 0;

  font: 400 14px Poppins;
}

.container .content form a {
  text-decoration: underline;
  margin-top: 5px;
}
input[type="file"] {
  background-color: transparent;
}

input::placeholder {
  font: 14px Poppins;
  opacity: 0.8;
}

input + input {
  margin-top: 20px;
}
button {
  background: #000000cc;
  border: none;
  border-radius: 5px;
  width: 182px;
  height: 48px;
  padding: 10px;
  margin-top: 20px;
  color: #FFF;
  font: 700 16px Poppins;
  cursor: pointer;
}

button:hover {
  background: #000000;
  transition: 0.3s;
}
h1,
p {
  font: 700 36px Poppins, sans-serif;
}

@media (max-width: 700px) {
  .container .content {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url("https://res.cloudinary.com/jvfaria015/image/upload/v1598458352/OWlogo_uosqlw.png")
      no-repeat;
    background-position: center top;
    background-size: 200px;
  }
  .container .content form {
    margin-top: 150px;
  }
  .container .content header h1 {
    position: relative;
    top: 140px;
  }
  .container .content form a span {
    color: #000000cc;
    padding-left: 170px;
  }
  .container .content form header {
    margin-bottom: 0;
    position: absolute;
    top: 0;
    margin-top: 20px;
  }
  .container .content form header h1 {
    font: bold 36px Poppins;
  }
}
</style>
