import React from "react";

const Child = ({ value }) => <h3>Count is :{value} </h3>;

const ParentToChild = () => {
    const [count, setCount] = React.useState(0);
    return (
        <div>
            <h1>Parent to Child</h1>
            <Child value={count} />
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    );
}

export { ParentToChild };
