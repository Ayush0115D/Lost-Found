function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition-all duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}

export default FeatureCard
