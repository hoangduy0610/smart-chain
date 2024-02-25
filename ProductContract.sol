// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductContract {
    
    address public owner = 0xa6AE3FA7c22FecC80ebbFADA388808B0aAF707c9; // Address allowed to perform restricted operations

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this operation");
        _;
    }
    
    struct Product {
        uint id;
        string name;
        uint manufacturer_id;
        uint supplier_id;
        bool is_deleted;
        string hash;
    }
    
    struct Supplier {
        uint id;
        string name;
        bool is_deleted;
        string hash;
    }
    
    struct Manufacturer {
        uint id;
        string name;
        bool is_deleted;
        string hash;
    }
    
    struct Transaction {
        uint id;
        string transaction_type;
        bool is_deleted;
        string hash;
    }
    
    mapping(uint => Product) public products;
    mapping(uint => Supplier) public suppliers;
    mapping(uint => Manufacturer) public manufacturers;
    mapping(uint => mapping(uint => Transaction)) productTransactions; // Mapping to store transactions for each product
    
    // Product Functions
    
    function addProduct(uint _id, string memory _name, uint _manufacturer_id, uint _supplier_id, string memory _hash) public onlyOwner {
        products[_id] = Product(_id, _name, _manufacturer_id, _supplier_id, false, _hash);
    }
    
    function updateProduct(uint _id, string memory _name, uint _manufacturer_id, uint _supplier_id, string memory _hash) public onlyOwner {
        require(!products[_id].is_deleted, "Product does not exist or is deleted");
        products[_id].name = _name;
        products[_id].manufacturer_id = _manufacturer_id;
        products[_id].supplier_id = _supplier_id;
        products[_id].hash = _hash;
    }
    
    function deleteProduct(uint _id) public onlyOwner {
        require(!products[_id].is_deleted, "Product does not exist or is already deleted");
        products[_id].is_deleted = true;
    }
    
    // Supplier Functions
    
    function addSupplier(uint _id, string memory _name, string memory _hash) public onlyOwner {
        suppliers[_id] = Supplier(_id, _name, false, _hash);
    }
    
    function updateSupplier(uint _id, string memory _name, string memory _hash) public onlyOwner {
        require(!suppliers[_id].is_deleted, "Supplier does not exist or is deleted");
        suppliers[_id].name = _name;
        suppliers[_id].hash = _hash;
    }
    
    function deleteSupplier(uint _id) public onlyOwner {
        require(!suppliers[_id].is_deleted, "Supplier does not exist or is already deleted");
        suppliers[_id].is_deleted = true;
    }
    
    // Manufacturer Functions
    
    function addManufacturer(uint _id, string memory _name, string memory _hash) public onlyOwner {
        manufacturers[_id] = Manufacturer(_id, _name, false, _hash);
    }
    
    function updateManufacturer(uint _id, string memory _name, string memory _hash) public onlyOwner {
        require(!manufacturers[_id].is_deleted, "Manufacturer does not exist or is deleted");
        manufacturers[_id].name = _name;
        manufacturers[_id].hash = _hash;
    }
    
    function deleteManufacturer(uint _id) public onlyOwner {
        require(!manufacturers[_id].is_deleted, "Manufacturer does not exist or is already deleted");
        manufacturers[_id].is_deleted = true;
    }
    
    // Transaction Functions
    
    function addTransaction(uint _product_id, uint _transaction_id, string memory _transaction_type, string memory _hash) public onlyOwner {
        require(!products[_product_id].is_deleted, "Product does not exist or is deleted");
        productTransactions[_product_id][_transaction_id] = Transaction(_transaction_id, _transaction_type, false, _hash);
    }
    
    function updateTransaction(uint _product_id, uint _transaction_id, string memory _transaction_type, string memory _hash) public onlyOwner {
        require(!products[_product_id].is_deleted, "Product does not exist or is deleted");
        require(!productTransactions[_product_id][_transaction_id].is_deleted, "Transaction does not exist or is deleted");
        productTransactions[_product_id][_transaction_id].transaction_type = _transaction_type;
        productTransactions[_product_id][_transaction_id].hash = _hash;
    }
    
    function deleteTransaction(uint _product_id, uint _transaction_id) public onlyOwner {
        require(!products[_product_id].is_deleted, "Product does not exist or is deleted");
        require(!productTransactions[_product_id][_transaction_id].is_deleted, "Transaction does not exist or is deleted");
        productTransactions[_product_id][_transaction_id].is_deleted = true;
    }
    
    // Getter functions for all entities (public access)
    
    function getProduct(uint _id) public view returns (Product memory) {
        return products[_id];
    }
    
    function getSupplier(uint _id) public view returns (Supplier memory) {
        return suppliers[_id];
    }
    
    function getManufacturer(uint _id) public view returns (Manufacturer memory) {
        return manufacturers[_id];
    }
    
    // Function to get transaction
    function getTransaction(uint _product_id, uint _trans_id) public view returns (Transaction memory) {
        return productTransactions[_product_id][_trans_id];
    }
}
