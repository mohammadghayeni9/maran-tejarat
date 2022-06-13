export default function (context) {
    context.$axios.setHeader(
      "Authorization",
      "Bearer " + localStorage.getItem("access_token")
    );
}