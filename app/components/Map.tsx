const Map = () => {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2827.166864516732!2d4.862853275793261!3d44.879253071070394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDTCsDUyJzQ1LjMiTiA0wrA1MSc1NS41IkU!5e0!3m2!1sfr!2sfr!4v1723385839297!5m2!1sfr!2sfr"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
