//login-funksjonen må være her'


const login = async (brukernavn) => {
    

    if (!brukernavn) {
        alert("Du må skrive inn et brukernavn.");
        return;
    }

    const user = await prisma.user.findFirst({
      where: {
        username:brukernavn
      }  
    })

    if (!user) {
      alert("Dette er ikke et gyldig brukernavn")
    } else {
      localStorage.setItem("brukernavn", brukernavn);
      alert("Du er logget inn")
      
  }

}