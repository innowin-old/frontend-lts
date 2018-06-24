import React, {Component} from "react";
import PropTypes from "prop-types";
import {DefaultProductIcon, BookmarkIcon} from "../../images/icons";
import {VerifyWrapper} from "../common/cards/Frames";
import {getIdentity} from "src/crud/identity";
import {getProducts} from "../../crud/product/product";
import {TagsBox} from "../bars/SideBar";
import {Link} from "react-router-dom";

export class Product extends Component {
  static defaultProps = {
    className: ''
  };

  static propTypes = {
    product: PropTypes.object,
    className: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      ownerName: "",
      productPicture: null,
      tags: [],
      isLoading: false,
      error: false
    }
  }

  _isLoadingTrue = () => {
    this.setState({...this.state, isLoading: true});
  };

  _getProductTags = (product) => {
    this._isLoadingTrue();
    //TODO mohsen: handle getProductTags
    const tags = [{title: "چادر مشکی"}, {title: "پوشاک مردانه"}];
    this.setState({...this.state, tags: tags, isLoading: false});
  };

  _getProductPicture = (product) => {
    this._isLoadingTrue();
    // TODO mohsen: get files from socket
    const mackData = [
      "http://restful.daneshboom.ir/media/ad33940ff4b84557af10c7ef8c98755b.jpeg",
      "http://restful.daneshboom.ir/media/0e6a0bf247654b66aa3ffb0afe8eeb34.jpeg",
      "http://restful.daneshboom.ir/media/d415fefe2f5442aab21c7783807819fe.jpeg"
    ];
    // const handleResult = (res) => {
    // TODO mohsen: test file and set suitable default img for product
    this.setState({
      ...this.state,
      // productPicture:productPicture,
      productPicture: mackData[2],
      isLoading: false
    }, (product) => (this._getProductTags(product)));
    // };
    //TODO mohsen: fix range of view image in sidBar product
    // getPictureProduct(product.id, handleResult)
    // };
  };

  _getProductIdentity = (product) => {
    this._isLoadingTrue();
    const handleResult = (res) => {
      this.setState({...this.state, ownerName: res.name, isLoading: false},
        (product) => (this._getProductPicture(product)));
    };
    getIdentity(product.product_owner, handleResult)
  };

  componentDidMount() {
    const {product} = this.props;
    this._getProductIdentity(product);
    // TODO mohsen: socket.emit of tags
    // TODO mohsen: socket.on of tags
  }

  render() {
    const {product, className} = this.props;
    const {productPicture, ownerName, tags, isLoading, error} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error} className={"-productComponent " + className}>
        <div className="flex-column">
          <div className="d-flex justify-content-between mb-2">
            <span>{product.name}</span>
            <BookmarkIcon className="-rBarBookmark"/>
          </div>
        </div>
        <div className="productContent">
          <Link to={`/product/${product.id}`}>
            {(!productPicture)?(<DefaultProductIcon/>):(<img alt="Product icon" src={productPicture}/>)}
          </Link>
          <span className="d-block pt-3">{ownerName}</span>
          <span className="d-block pt-2">{"قیمت: " + (this.props.price || "تماس")}</span>
        </div>
        {
          (tags.length > 0) ? (
            <div className="productTags row pt-2 m-0">
              <TagsBox tags={tags}/>
            </div>
          ) : ("")
        }
      </VerifyWrapper>
    )
  }
}

export default class ProductExplorerContent extends Component {
  static propTypes = {
    activeContribution: PropTypes.arrayOf(PropTypes.string),
    activeCategory: PropTypes.number,
    activeSubcategory: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],
      products: [],
      isLoading: false,
      error: false
    }
  }

  _isLoadingTrue = () => {
    this.setState({...this.state, isLoading: true});
  };

  componentDidMount() {
    this._handleScroll();
    this._isLoadingTrue();
    const handleResult = (res) => {
      this.setState({...this.state, allProducts: res, products: res, isLoading: false});
    };
    getProducts(100, handleResult)
  }

  _handleScroll = () => {
    const _handlefectch = (percent) => {
      // TODO
    };
    document.addEventListener('scroll', () => {
      let height = document.body.scrollHeight;
      let scrollYOffset = window.pageYOffset;
      let windowHeight = window.innerHeight;
      if(0.6 < (windowHeight+scrollYOffset)/height && (windowHeight+scrollYOffset)/height < 0.65){
        _handlefectch((windowHeight+scrollYOffset)/height)
      }
    })
  };

  componentWillReceiveProps(nextProps) {
    const {allProducts} = this.state;
    // TODO mohsen: filter by activeContribution and handle filter by backEnd
    const {activeContribution, activeCategory, activeSubcategory} = nextProps;
    let filteredProducts = allProducts;
    if (activeSubcategory){
      filteredProducts = allProducts.filter((product) => (product.product_category.id === activeSubcategory));
    } else if (activeCategory){
      filteredProducts = allProducts.filter((product) => (product.product_category.id === activeCategory));
      if (activeCategory === 999999){
        filteredProducts = allProducts;
      }
    }
    this.setState({...this.state, products:filteredProducts})
  }

  render() {
    const {products, isLoading, error} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}
                     className="row -product-explorer-content mr-0 ml-0">
          {
            (products.length > 0) ? (
              products.map((product) => {
                  return (
                    <Product product={product} key={product.id + "ProductExplorerContent"}/>
                  )
                }
              )) : ('')
          }
      </VerifyWrapper>

    )
  }
}