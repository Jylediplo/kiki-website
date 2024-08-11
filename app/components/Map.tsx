const Map = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '0',
        paddingBottom: '56.25%',
        position: 'relative',
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5654.706454851783!2d4.866581844482554!3d44.87546013428154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b54d160f3993d9%3A0xf8ffc9d224dcce45!2sLe%20Surplus!5e0!3m2!1sfr!2sfr!4v1723386523895!5m2!1sfr!2sfr"
        style={{
          border: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
