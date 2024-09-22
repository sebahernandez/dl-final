const About = () => {
  return (
    <section className=" py-[100px] px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
          Bienvenidos a SneckersShop
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-8">
          En SneckersShop, nos apasiona ofrecerte las mejores zapatillas del
          mercado. Ya sea que busques un par para correr, caminar por la ciudad
          o simplemente lucir con estilo, tenemos la zapatilla perfecta para ti.
        </p>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          <div className="lg:w-1/3 text-left bg-white p-5 rounded-md h-52">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Calidad Garantizada
            </h3>
            <p className="text-gray-700">
              Seleccionamos cuidadosamente cada par de zapatillas para asegurar
              que solo te ofrezcamos la mejor calidad. Nos aseguramos de que
              cada cliente reciba un producto que superará sus expectativas.
            </p>
          </div>
          <div className="lg:w-1/3 text-left bg-white p-5 rounded-md h-52">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Variedad Inigualable
            </h3>
            <p className="text-gray-700">
              Desde modelos clásicos hasta los últimos lanzamientos, nuestra
              tienda cuenta con una amplia variedad de zapatillas para cada
              gusto y necesidad. ¡Encuentra tu par perfecto con nosotros!
            </p>
          </div>
          <div className="lg:w-1/3 text-left bg-white p-5 rounded-md h-52">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Experiencia de Compra
            </h3>
            <p className="text-gray-700">
              En SneckersShop, tu satisfacción es nuestra prioridad. Ofrecemos
              una experiencia de compra fácil y segura, con envío rápido y
              atención al cliente excepcional.
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 mt-12">
          <div className="lg:w-1/3 text-left bg-white p-5 rounded-md h-60">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Sostenibilidad y Responsabilidad
            </h3>
            <p className="text-gray-700">
              En SneckersShop, nos comprometemos con la sostenibilidad. Por eso,
              trabajamos con marcas que se dedican a la fabricación de
              zapatillas con materiales reciclados y procesos eco-amigables.
              Creemos en ofrecer productos que no solo te hagan lucir bien, sino
              que también tengan un impacto positivo en el planeta.
            </p>
          </div>
          <div className="lg:w-1/3 text-left bg-white p-5 rounded-md h-60">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Nuestro Compromiso Contigo
            </h3>
            <p className="text-gray-700">
              No solo vendemos zapatillas; vendemos confianza. Cada compra en
              SneckersShop es respaldada por nuestro compromiso de calidad y
              satisfacción. Si no estás completamente satisfecho, haremos todo
              lo posible para solucionarlo.
            </p>
          </div>
          <div className="lg:w-1/3 text-left bg-white p-5 rounded-md h-60">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Únete a Nuestra Comunidad
            </h3>
            <p className="text-gray-700">
              Únete a miles de clientes satisfechos que han encontrado sus
              zapatillas ideales en SneckersShop. Síguenos en redes sociales y
              suscríbete a nuestro boletín para recibir las últimas noticias,
              ofertas exclusivas y lanzamientos de productos directamente en tu
              bandeja de entrada.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
