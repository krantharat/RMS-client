export const menuOptions = [
    { value: "menu1", label: "pizza", category: "main", price: 100, cost: 50 },
    { value: "menu2", label: "milk shake", category: "drinks", price: 200, cost: 100 },
    { value: "menu3", label: "toast", category: "dessert", price: 150, cost: 75 },
    { value: "menu4", label: "cupcake", category: "dessert", price: 200, cost: 150 },
    { value: "menu5", label: "pudding", category: "dessert", price: 250, cost: 200 },
  ];
  
  // Mock data for table
  export const tableRows = [
    { menu: "pizza", category: "main", price: 100, cost: 50, QTY: 2 },
    { menu: "milk shake", category: "drinks", price: 200, cost: 100, QTY: 1 },
    { menu: "toast", category: "dessert", price: 150, cost: 75, QTY: 3 },
    { menu: "cupcake", category: "dessert", price: 200, cost: 150, QTY: 4 },
    { menu: "pudding", category: "dessert", price: 250, cost: 200, QTY: 5 },
  ];

   //Mock data for bill
  export const billData = [
  {
    billNumber: "B001",
    date: "2024-06-01",
    items: [
      { menu: "pizza", category: "main", price: 100, cost: 50, QTY: 2 },
      { menu: "milk shake", category: "drinks", price: 200, cost: 100, QTY: 1 },
      { menu: "toast", category: "dessert", price: 150, cost: 75, QTY: 3 },
    ]
  },
  {
    billNumber: "B002",
    date: "2024-06-02",
    items: [
      { menu: "pizza", category: "main", price: 100, cost: 50, QTY: 1 },
      { menu: "cupcake", category: "dessert", price: 200, cost: 150, QTY: 2 },
      { menu: "pudding", category: "dessert", price: 250, cost: 200, QTY: 2 },
    ]
  },
  {
    billNumber: "B003",
    date: "2024-06-03",
    items: [
      { menu: "milk shake", category: "drinks", price: 200, cost: 100, QTY: 3 },
      { menu: "toast", category: "dessert", price: 150, cost: 75, QTY: 1 },
    ]
  },
];

export const menuData = [
  { id: 1, category: 'Appetizer', menu: 'Spring Rolls', price: 5.99, cost: 3.00 },
  { id: 2, category: 'Main Course', menu: 'Pad Thai', price: 10.99, cost: 6.00 },
  { id: 3, category: 'Dessert', menu: 'Mango Sticky Rice', price: 7.99, cost: 4.00 },
];


  