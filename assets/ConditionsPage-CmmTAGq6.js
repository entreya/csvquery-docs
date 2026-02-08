import{j as e}from"./index-Z1vyp1WY.js";import{C as r}from"./CodeBlock-PEt4H_Dw.js";import"./MermaidDiagram-DXFfz0sI.js";function d(){return e.jsxs(e.Fragment,{children:[e.jsx("h1",{id:"condition-syntax",children:"Condition Syntax"}),e.jsx("p",{children:"CsvQuery supports Yii2-style conditions for flexible, readable query building."}),e.jsx("h2",{id:"hash-format",children:"Hash Format"}),e.jsx("p",{children:"The simplest format - key-value pairs are joined with AND:"}),e.jsx(r,{className:"language-php",children:`// Single condition
->where(['STATUS' => 'active'])

// Multiple conditions (implicit AND)
->where(['STATUS' => 'active', 'TYPE' => 'premium'])`}),e.jsx("h2",{id:"operator-format",children:"Operator Format"}),e.jsx("p",{children:"For comparisons, use array format with operator first:"}),e.jsx(r,{className:"language-php",children:"['operator', 'column', value]"}),e.jsx("h3",{id:"comparison-operators",children:"Comparison Operators"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Operator"}),e.jsx("th",{children:"Example"}),e.jsx("th",{children:"Description"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"="})}),e.jsx("td",{children:e.jsx("code",{children:"['=', 'STATUS', 'active']"})}),e.jsx("td",{children:"Equal (same as hash format)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"!="})}),e.jsx("td",{children:e.jsx("code",{children:"['!=', 'STATUS', 'deleted']"})}),e.jsx("td",{children:"Not equal"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:">"})}),e.jsx("td",{children:e.jsx("code",{children:"['>', 'SCORE', 80]"})}),e.jsx("td",{children:"Greater than"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:">="})}),e.jsx("td",{children:e.jsx("code",{children:"['>=', 'AGE', 18]"})}),e.jsx("td",{children:"Greater or equal"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"<"})}),e.jsx("td",{children:e.jsx("code",{children:"['<', 'PRICE', 100]"})}),e.jsx("td",{children:"Less than"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"<="})}),e.jsx("td",{children:e.jsx("code",{children:"['<=', 'QUANTITY', 0]"})}),e.jsx("td",{children:"Less or equal"})]})]})]}),e.jsx("h3",{id:"special-operators",children:"Special Operators"}),e.jsx("h4",{children:e.jsx("code",{children:"BETWEEN"})}),e.jsx(r,{className:"language-php",children:`->where(['BETWEEN', 'AGE', 18, 65])
// Matches: 18 <= AGE <= 65`}),e.jsx("h4",{children:e.jsx("code",{children:"IN"})}),e.jsx(r,{className:"language-php",children:`->where(['IN', 'CATEGORY', ['A', 'B', 'C']])
// Matches any of A, B, or C`}),e.jsx("h4",{children:e.jsx("code",{children:"NOT IN"})}),e.jsx(r,{className:"language-php",children:"->where(['NOT IN', 'STATUS', ['deleted', 'banned']])"}),e.jsx("h4",{children:e.jsx("code",{children:"LIKE"})}),e.jsx(r,{className:"language-php",children:`->where(['LIKE', 'NAME', '%john%'])   // Contains
->where(['LIKE', 'EMAIL', '%@gmail.com']) // Ends with`}),e.jsx("h4",{children:e.jsx("code",{children:"NOT LIKE"})}),e.jsx(r,{className:"language-php",children:"->where(['NOT LIKE', 'EMAIL', '%spam%'])"}),e.jsx("h2",{id:"logical-operators",children:"Logical Operators"}),e.jsx("h3",{id:"and-conditions",children:"AND Conditions"}),e.jsx(r,{className:"language-php",children:`// Using andWhere() - most common
->where(['STATUS' => 'active'])
->andWhere(['>', 'SCORE', 80])

// Using explicit AND
->where(['AND',
    ['STATUS' => 'active'],
    ['>', 'SCORE', 80]
])`}),e.jsx("h3",{id:"or-conditions",children:"OR Conditions"}),e.jsx(r,{className:"language-php",children:`// Using orWhere()
->where(['STATUS' => 'active'])
->orWhere(['STATUS' => 'pending'])

// Using explicit OR
->where(['OR',
    ['STATUS' => 'active'],
    ['STATUS' => 'pending']
])`}),e.jsx("h2",{id:"nested-conditions",children:"Nested Conditions"}),e.jsx("p",{children:"Combine AND/OR for complex logic:"}),e.jsx(r,{className:"language-php",children:`// (STATUS = 'active') OR (SCORE > 90 AND TYPE = 'vip')
->where(['OR',
    ['STATUS' => 'active'],
    ['AND',
        ['>', 'SCORE', 90],
        ['TYPE' => 'vip']
    ]
])`}),e.jsx("h2",{id:"null-checks",children:"NULL Checks"}),e.jsx(r,{className:"language-php",children:`// Check for NULL
->where(['IS', 'DELETED_AT', null])

// Check for NOT NULL
->where(['IS NOT', 'EMAIL', null])`}),e.jsx("h2",{id:"filter-where",children:"Filter Where"}),e.jsx("p",{children:"Ignores empty values - useful for search forms:"}),e.jsx(r,{className:"language-php",children:`// Empty values are ignored
$query->filterWhere([
    'STATUS' => $request->status,     // Ignored if empty
    'CATEGORY' => $request->category, // Ignored if empty
]);`})]})}export{d as ConditionsPage};
