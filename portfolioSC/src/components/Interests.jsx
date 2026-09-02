import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/* -------------------------------------------------------------------------- */
/* CARD                                                                       */
/* -------------------------------------------------------------------------- */

function CreativeCard({ card, variants }) {
  const navigate = useNavigate();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Suavizado fluido para el efecto 3D en escritorio
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

  const rotateX = useTransform(smoothMouseY, [-1, 1], [7, -7]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-7, 7]);

  /* ---------------------------------------------------------------------- */
  /* MOUSE INTERACTION                                                      */
  /* ---------------------------------------------------------------------- */

  const handleMouseMove = (event) => {
    if (event.pointerType === 'touch') return;

    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const normalizedY = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    mouseX.set(Math.max(-1, Math.min(1, normalizedX)));
    mouseY.set(Math.max(-1, Math.min(1, normalizedY)));
  };

  const handleMouseLeave = () => {
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
          transformStyle: 'preserve-3d',
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
            {String(card.id).padStart(2, '0')}
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
/* COMPONENTE PRINCIPAL                                                       */
/* -------------------------------------------------------------------------- */

export default function Interests() {
  const { t } = useTranslation();

  const cards = [
    {
      id: 1,
      title: t('interests.cards.hobbies.title'),
      text: t('interests.cards.hobbies.text'),
      link: '/hobbies',
    },
    {
      id: 2,
      title: t('interests.cards.inspirations.title'),
      text: t('interests.cards.inspirations.text'),
      link: '/inspirations',
    },
    {
      id: 3,
      title: t('interests.cards.playlist.title'),
      text: t('interests.cards.playlist.text'),
      link: '/playlist',
    },
  ];

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
                {t('interests.title')}
              </h2>
            </div>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {cards.map((card) => (
              <CreativeCard
                key={card.id}
                card={card}
                variants={revealVariants}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}