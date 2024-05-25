// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SmartChain {
    struct Product {
        string name;
        uint256 price;
    }

    mapping(string => Product) private products;

    function addProduct(string id, string memory name, uint256 price) public {
        products[id] = Product(name, price);
    }

    function getProduct(string id) public view returns (string memory, uint256) {
        Product memory product = products[id];
        return (product.name, product.price);
    }
}