export default function (context) {
    context.$axios.setHeader(
      "Authorization",
      "Bearer " + localStorage.getItem("access_token")
    );
    
    context.$axios.onError((error) => {
      if (
        error.response.status === 401 &&
        context.route.name !== "Account-Login"
      ) {
        localStorage.clear();
        return context.redirect("/account/login/");
      }
    })
    
    if (!localStorage.getItem("access_token")) {
      if (context.route.name !== 'Account-Login') {
        localStorage.clear();
        return context.redirect("/account/login/"); 
      }
    } else {
      if (context.route.name === 'Account-Login') {
        return context.redirect(context.from.fullpath)
      }
    }
}