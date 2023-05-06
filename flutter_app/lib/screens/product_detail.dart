import 'package:card_swiper/card_swiper.dart';
import 'package:fancy_shimmer_image/fancy_shimmer_image.dart';
import 'package:flutter/material.dart';
import 'package:price_comparison_sa/consts/global_colors.dart';
import 'package:price_comparison_sa/models/products_model.dart';
import 'package:price_comparison_sa/services/api_handler.dart';


class ProductDetails extends StatefulWidget {
  const ProductDetails({super.key, required this.id});
  final String id;
  

  @override
  State<ProductDetails> createState() => _ProductDetailsState();
}

class _ProductDetailsState extends State<ProductDetails> {

  final titleStyle = const TextStyle(fontSize:24, fontWeight: FontWeight.bold);

  ProductModel? productModel;
  bool isError = false;
  String errorString = "";
  Future<void> getSingleProduct () async {
    try {
       productModel = await APIHandler.getSingleProduct(id: widget.id);
    } catch (error) {
        errorString = error.toString();
         isError = true;
    }
   
    setState(() {
    });
  }

  @override
  void didChangeDependencies() {
    getSingleProduct();
    super.didChangeDependencies();
  }


  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: SafeArea(
        child: 
        isError ?  Center(
          child: Text('An error occured $errorString', style: const TextStyle(fontSize: 25, fontWeight: FontWeight.w500, ),),
        ) :
        
        productModel == null? const Center(child: CircularProgressIndicator(),): SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
              const SizedBox(
                height: 18,
              ),
              IconButton(
                icon: const Icon(
                  Icons.arrow_back_ios,
                  color: Colors.black,
                ),
                onPressed: () {
                  Navigator.pop(context);
                },
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                   const Text(
                      'Product Information',
                      style: TextStyle(fontSize: 20, fontWeight: FontWeight.w500, color:  Color(0xff9C4668)),
                    ),
                    const SizedBox(
                      height: 18,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Flexible(
                          flex: 3,
                          child: Text(
                            productModel!.name.toString(),
                            textAlign: TextAlign.start,
                            style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800, color:  Color(0xff9C4668)),
                          ),
                        ),
                        Flexible(
                          flex: 1,
                          child: Text(
                            productModel!.price.toString(),
                            style: const TextStyle(
                              color:  Color(0xff9C4668),
                              fontWeight: FontWeight.bold,
                              fontSize: 25,
                            ),
                          ),
                        )
                      ],
                    ),
                    const SizedBox(
                      height: 18,
                    ),
                  ],
                ),
              ),
              SizedBox(
                height: size.height * 0.4,
                child: Swiper(
                  itemCount: 1,
                  itemBuilder: (BuildContext context, int index) {
                    return FancyShimmerImage(
                      width: double.infinity,
                      imageUrl: productModel!.images![0]!.url!,
                      boxFit: BoxFit.fill,
                    );
                  },
                  autoplay: true,
                  pagination: const SwiperPagination(
                    alignment: Alignment.bottomCenter,
                    builder: DotSwiperPaginationBuilder(
                        color: Colors.white, activeColor: Colors.red),
                  ),
                ),
              ),
              const SizedBox(
                height: 18,
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const [
                    Text(
                      'Description',
                      style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800, color:  Color(0xff9C4668)),
                    ),
                    SizedBox(
                      height: 18,
                    ),
                     Text(
                      'There are many different types of food, such as fruits, vegetables, rice, and pasta. We need to eat a variety of foods to get all the essential nutrients the body needs. Not eating a healthy and balanced diet leads to weakness and deficiency diseases.',
                      textAlign: TextAlign.start,
                      style: const TextStyle(fontSize: 16),
                    )
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
  
