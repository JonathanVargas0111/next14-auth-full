/* import SignUpForm from "@/app/components/SignUpForm"; */
import SignUpForm from "@/app/components/SignUpForm";
import { Image, Link } from "@nextui-org/react";

const SignupPage = () => {
  return (
    <div>
      <section className="min-h-screen flex items-stretch text-white ">
        <div className="lg:flex w-1/2 hidden bg-gray-500 relative items-center bg-[url('/img/hero-skate.jpg')]">
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide animate__animated animate__backInLeft">¡Regístrate y comparte tus mejores trucos!</h1>
            <p className="text-3xl my-4 animate__animated animate__backInUp"> ¡Es hora de mostrar tu talento en lo que amas!</p>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 " >
          <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center bg-[url('/img/hero-skate.jpg')]">
            <div className="absolute bg-black opacity-90 inset-0 z-0  bg-gradient-to-r from-slate-900 to-slate-900"></div>
          </div>
          <div className="w-full py-6 z-20 flex flex-col justify-items-center animate__animated animate__backInRight">
            <div className="w-full px-24 z-10 lg:hidden">
              <p className="text-3xl my-4"> ¡Es hora de mostrar tu talento!</p>
            </div>
            <div className="py-6 space-x-2">
              <span className="w-10 h-10  lg:w-14 lg:h-14 items-center justify-center inline-flex rounded-full font-bold text-lg lg:text-2xl border-2 border-red-600">G+ </span>
            </div>
            <p className="text-gray-100">
              or use email your account
            </p>
            <SignUpForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignupPage;