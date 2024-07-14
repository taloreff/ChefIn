import Checkmark from '../assets/svgs/Checkmark';

export function ChefIncluded({ items }) {

  return (
    <section>
      <h2>What's Included</h2>
      <div className="offers-grid">
        {items.map((item, index) => {
          return (
            <div key={index} className="offer">
              <Checkmark />
              {item}
            </div>
          )
        })}
      </div>
    </section>
  )
}

