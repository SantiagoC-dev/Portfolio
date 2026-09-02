import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* -------------------------------------------------------------------------- */
/* CARD                                                                       */
/* -------------------------------------------------------------------------- */

function CreativeCard({ card, variants, sensorX, sensorY, sensorActive }) {
  const navigate = useNavigate();

  // Mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Suavizado
  const smoothMouseX = useSpring(mouseX, {
    stiffness: 140,
    damping: 22,
    mass: 0.5,
  });

  const smoothMouseY = useSpring(mouseY, {
    stiffness: 140,
    damping: 22,
    mass: 0.5,
  });

  const smoothSensorX = useSpring(sensorX, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  const smoothSensorY = useSpring(sensorY, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  /*
   * En móvil usamos el sensor.
   * En escritorio usamos el mouse.
   */
  const activeX = sensorActive ? smoothSensorX : smoothMouseX;
  const activeY = sensorActive ? smoothSensorY : smoothMouseY;

  const rotateX = useTransform(activeY, [-1, 1], [7, -7]);
  const rotateY = useTransform(activeX, [-1, 1], [-7, 7]);

  /* ---------------------------------------------------------------------- */
  /* MOUSE                                                                   */
  /* ---------------------------------------------------------------------- */

  const handleMouseMove = (event) => {
    if (sensorActive || event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();

    const normalizedX =
      (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);

    const normalizedY =
      (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    mouseX.set(Math.max(-1, Math.min(1, normalizedX)));
    mouseY.set(Math.max(-1, Math.min(1, normalizedY)));
  };

  const handleMouseLeave = () => {
    if (sensorActive) return;

    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      variants={variants}
      style={{ perspective: 1200 }}
      className="h-full"
    >
      <motion.article
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          if (card.link) {
            navigate(card.link);
          }
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="
          group
          relative
          flex
          h-full
          min-h-[300px]
          cursor-pointer
          flex-col
          overflow-hidden
          rounded-[28px]
          border
          border-gray-200/80
          bg-white
          p-7
          transition-shadow
          duration-300
          hover:shadow-xl
          hover:shadow-black/5

          dark:border-gray-800
          dark:bg-gray-900/80
          dark:hover:border-gray-700
          dark:hover:bg-gray-900
          dark:hover:shadow-gray-900/30
        "
      >
        {/* Línea superior */}
        <div
          className="
            absolute
            left-0
            top-0
            h-px
            w-0
            bg-gray-900
            transition-all
            duration-500
            group-hover:w-full
            dark:bg-gray-300
          "
        />

        {/* Header */}
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-medium tracking-[0.18em] text-gray-400 dark:text-gray-500">
            {String(card.id).padStart(2, "0")}
          </span>

          <span
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-gray-200
              text-gray-400
              transition-all
              duration-300

              group-hover:border-gray-900
              group-hover:bg-gray-900
              group-hover:text-white

              dark:border-gray-700/80
              dark:text-gray-500
              dark:group-hover:border-gray-600
              dark:group-hover:bg-gray-800
              dark:group-hover:text-gray-300
            "
          >
            <svg
              className="
                h-3.5
                w-3.5
                -rotate-45
                transition-transform
                duration-300
                group-hover:rotate-0
              "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M5 12h14m-6-6l6 6-6 6"
              />
            </svg>
          </span>
        </div>

        {/* Content */}
        <div className="mt-auto pt-16">
          <h3
            className="
              max-w-[320px]
              text-2xl
              font-serif
              leading-tight
              tracking-tight
              text-gray-950
              transition-transform
              duration-300
              group-hover:translate-x-1

              dark:text-gray-200
              dark:group-hover:text-white
            "
          >
            {card.title}
          </h3>

          <div
            className="
              mt-5
              h-px
              w-8
              bg-gray-300
              transition-all
              duration-300
              group-hover:w-12
              group-hover:bg-gray-900

              dark:bg-gray-700
              dark:group-hover:bg-gray-500
            "
          />

          <p
            className="
              mt-5
              max-w-[340px]
              text-sm
              font-light
              leading-7
              text-gray-500

              dark:text-gray-400
            "
          >
            {card.text}
          </p>
        </div>
      </motion.article>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* COMPONENTE PRINCIPAL                                                      */
/* -------------------------------------------------------------------------- */

export default function Interests() {
  const { t } = useTranslation();

  const [needsPermission, setNeedsPermission] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [sensorActive, setSensorActive] = useState(false);

  /*
   * Valores compartidos por las tres tarjetas.
   *
   * Esto es mucho mejor que crear un listener por tarjeta.
   */
  const sensorX = useMotionValue(0);
  const sensorY = useMotionValue(0);

  const sensorDetected = useRef(false);

  /* ---------------------------------------------------------------------- */
  /* DETECTAR IOS                                                            */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    const supportsOrientation =
      typeof window !== "undefined" && "DeviceOrientationEvent" in window;

    if (!supportsOrientation) {
      console.info("DeviceOrientation no está disponible.");
      return;
    }

    /*
     * iOS necesita permiso explícito.
     */
    if (
      isIOS &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      setNeedsPermission(true);
      return;
    }

    /*
     * Android normalmente no necesita requestPermission().
     * Sin embargo, todavía esperamos a recibir un evento real.
     */
    setPermissionGranted(true);
  }, []);

  /* ---------------------------------------------------------------------- */
  /* SENSOR                                                                  */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (!permissionGranted) return;

    if (typeof window === "undefined") return;

    const handleDeviceOrientation = (event) => {
      if (event.beta == null || event.gamma == null) {
        return;
      }

      /*
       * El hecho de que lleguemos aquí significa que
       * el navegador realmente está entregando datos.
       */
      if (!sensorDetected.current) {
        sensorDetected.current = true;
        setSensorActive(true);

        console.info("✓ DeviceOrientation activo");
      }

      /*
       * gamma:
       * inclinación izquierda / derecha
       *
       * beta:
       * inclinación adelante / atrás
       */

      let gamma = event.gamma;
      let beta = event.beta;

      /*
       * Detectamos orientación de pantalla.
       */
      const orientation = window.screen?.orientation?.angle ?? 0;

      /*
       * Ajustes para diferentes orientaciones.
       */
      if (orientation === 90) {
        const temp = gamma;
        gamma = -beta;
        beta = temp;
      } else if (orientation === -90 || orientation === 270) {
        const temp = gamma;
        gamma = beta;
        beta = -temp;
      }

      /*
       * Normalización.
       *
       * Usamos un rango más pequeño para que el movimiento
       * sea visible sin que la tarjeta se vuelva exagerada.
       */
      const normalizedX = Math.max(-1, Math.min(1, gamma / 25));

      const normalizedY = Math.max(-1, Math.min(1, (beta - 45) / 25));

      sensorX.set(normalizedX);
      sensorY.set(normalizedY);
    };

    /*
     * IMPORTANTE:
     * capture = false
     */
    window.addEventListener(
      "deviceorientation",
      handleDeviceOrientation,
      false,
    );

    return () => {
      window.removeEventListener(
        "deviceorientation",
        handleDeviceOrientation,
        false,
      );
    };
  }, [permissionGranted, sensorX, sensorY]);

  /* ---------------------------------------------------------------------- */
  /* PEDIR PERMISO                                                           */
  /* ---------------------------------------------------------------------- */

  const requestAccess = async () => {
    try {
      if (typeof DeviceOrientationEvent === "undefined") {
        console.warn("DeviceOrientationEvent no está disponible.");
        return;
      }

      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        /*
         * MUY IMPORTANTE:
         * esto ocurre directamente dentro del click.
         */
        const permission = await DeviceOrientationEvent.requestPermission();

        console.log("Permiso DeviceOrientation:", permission);

        if (permission === "granted") {
          setPermissionGranted(true);
          setNeedsPermission(false);
        } else {
          console.warn("Permiso de orientación rechazado.");
          setNeedsPermission(false);
        }
      } else {
        /*
         * Android / otros navegadores.
         */
        setPermissionGranted(true);
        setNeedsPermission(false);
      }
    } catch (error) {
      console.error("Error solicitando DeviceOrientation:", error);

      setNeedsPermission(false);
    }
  };

  /* ---------------------------------------------------------------------- */
  /* CARDS                                                                   */
  /* ---------------------------------------------------------------------- */

  const cards = [
    {
      id: 1,
      title: t("interests.cards.hobbies.title"),
      text: t("interests.cards.hobbies.text"),
      link: "/hobbies",
    },
    {
      id: 2,
      title: t("interests.cards.inspirations.title"),
      text: t("interests.cards.inspirations.text"),
      link: "/inspirations",
    },
    {
      id: 3,
      title: t("interests.cards.playlist.title"),
      text: t("interests.cards.playlist.text"),
      link: "/playlist",
    },
  ];

  /* ---------------------------------------------------------------------- */
  /* ANIMACIONES                                                             */
  /* ---------------------------------------------------------------------- */

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const revealVariants = {
    hidden: {
      opacity: 0,
      y: 14,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  /* ---------------------------------------------------------------------- */
  /* RENDER                                                                  */
  /* ---------------------------------------------------------------------- */

  return (
    <section
      id="interests"
      className="
        w-full
        border-t
        border-gray-200/70
        dark:border-gray-800/70
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-6
          pb-16
          pt-20

          md:pb-20
          md:pt-28

          lg:pb-24
          lg:pt-32
        "
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
        >
          {/* Header */}
          <motion.div
            variants={revealVariants}
            className="
              mb-14
              flex
              flex-col
              gap-7

              md:mb-16
              md:flex-row
              md:items-end
              md:justify-between
            "
          >
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-gray-900 dark:bg-white" />

                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-gray-400

                    dark:text-gray-500
                  "
                >
                  Personal
                </span>
              </div>

              <h2
                className="
                  max-w-2xl
                  text-4xl
                  font-serif
                  leading-[1.05]
                  tracking-tight
                  text-gray-950

                  sm:text-5xl

                  dark:text-white
                "
              >
                {t("interests.title")}
              </h2>
            </div>

            {/* iOS permission */}
            {needsPermission && (
              <button
                type="button"
                onClick={requestAccess}
                className="
                  self-start
                  rounded-full
                  border
                  border-gray-200
                  px-4
                  py-2
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.16em]
                  text-gray-500
                  transition-colors
                  duration-300
                  hover:border-gray-400
                  hover:text-gray-900

                  dark:border-gray-800
                  dark:text-gray-500
                  dark:hover:border-gray-600
                  dark:hover:text-white

                  md:self-end
                "
              >
                {t("interests.activateExperience")}
              </button>
            )}
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {cards.map((card) => (
              <CreativeCard
                key={card.id}
                card={card}
                variants={revealVariants}
                sensorX={sensorX}
                sensorY={sensorY}
                sensorActive={sensorActive}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
