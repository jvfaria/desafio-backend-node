<template>
  <div class="container">
    <div class="content">
      <div id="form-title" />
      <form>
        <header>
          <h1>Nova categoria</h1>
        </header>
        <div id="input-group">
          <input type="text" placeholder="nome da categoria" />
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
  background: #FFF;
}
.container .content form a {
  text-decoration: underline;
  margin-top: 5px;
}

input::placeholder {
  font: 14px Poppins;
  opacity: 0.8;
}
input[type="text"] {
  width: 100%;
  padding: 25px;
  box-sizing: border-box;
  outline: 0;

  font: 400 14px Poppins;
}
input[type="password"] {
  width: 100%;
  padding: 25px;
  box-sizing: border-box;
  outline: 0;

  font: 400 14px Poppins;
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
