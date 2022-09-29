import { StyleSheet, Text, View , FlatList, ImageBackground, Dimensions } from 'react-native'
import React , { useState, useEffect, useRef } from 'react'

/* db */
import { course } from '../tempDB/course'

const width = Dimensions.get('window').width;
let currentSlideIndex = 0;
let intervalId;

const CarouselCourse = () => {
  const [ dataToRender, setDataToRender ] = useState([]);
  const [ visibleSlideIndex, setVisibleSlideIndex ] = useState(0);
  const [ activeSlideIndex, setActiveSlideIndex ] = useState(0);
  
  const onViewableItemsChanged = useRef(({viewableItems})=>{
      currentSlideIndex = viewableItems[0]?.index || 0
      setVisibleSlideIndex( currentSlideIndex );
  });

  const viewabilityConfig = useRef({
      viewAreaCoveragePercentThreshold : 50
  });

  const flatList = useRef();

  const handleScrollTo = (index) => {
     flatList.current.scrollToIndex({ animated: false, index })
  }

  const startSlider = () => {
    if(currentSlideIndex <= dataToRender.length -2 ){
       intervalId = setInterval(()=>{
          flatList.current.scrollToIndex({ 
             animated: true,
             index: currentSlideIndex + 1
          }) 
       }, 4000);
    }else{
        pauseSlider();
    } 
 }

  const pauseSlider = () => {
     clearInterval(intervalId);
  }

  useEffect(()=>{
    if(dataToRender.length && flatList.current && typeof flatList.current.scrollToIndex ==='function'){
       startSlider();
    }
 }, [dataToRender.length]);

  useEffect(()=>{
    const newData = [[...course].pop(), ...course, [...course].shift()];
    setDataToRender([...newData])
  },[course.length]);

  useEffect(()=>{
     const length = dataToRender.length;
     //첫번 째 리셋
     if(visibleSlideIndex === length -1 && length ) {
        handleScrollTo(1)
     }
     //마지막 페이지 리셋
     if(visibleSlideIndex === 0 && length ) {
        handleScrollTo(length -2)
     }
     const lastSlide = currentSlideIndex === length -1;
     const firstSlide = currentSlideIndex === 0;

     if( lastSlide && length ) setActiveSlideIndex(0)
     else if(firstSlide && length) setActiveSlideIndex(length -2)
     else setActiveSlideIndex(currentSlideIndex - 1)
  }, [visibleSlideIndex])

  return (
    <View style={[styles.container, {position:'relative'}]}>
      <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                position:'absolute',
                right: 0,
                top : 40,
                zIndex: 2
            }}
      >
          <View style={{flexDirection:'row', alignItems:'center', paddingHorizontal:30, marginTop:-30}}>
             {
                course.map((item, index)=> {
                    return (
                        <View key={item.id}
                              style={{
                                 width: 12, height: 12, borderRadius: 6, 
                                 borderWidth: 2, marginLeft: 5, 
                                 backgroundColor: activeSlideIndex===index ? '#383838':'transparent' 
                              }}
                        />      
                    )
                })
             }  
          </View>  
      </View>    

      <FlatList 
                ref= { flatList }
                data={ dataToRender }
                keyExtractor = { (item, index)=> item.id + index }
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={1}
                getItemLayout={(_, index)=>({
                    length: width-20,
                    offset: width * index,
                    index
                })}
                onViewableItemsChanged = { onViewableItemsChanged.current }
                viewabilityConfig = { viewabilityConfig.current }
                onScrollBeginDrag={pauseSlider}
                onScrollEndDrag={startSlider}
                renderItem={({ item }) => (
                    <ImageBackground source={item.img }
                                     style={{ width: width-20, 
                                             height: width * 0.5,
                                             borderRadius: 7,
                                             resizeMode: 'cover',
                                             borderRadius: 10,
                                             overflow: 'hidden',
                                             marginHorizontal:10
                                            }}
                    >
                        <Text style={{ fontSize:25, color:'yellow', margin:10, marginTop:30, fontWeight:'bold' }}>
                            {item.name}
                        </Text>
                        <Text style={{ fontSize:16, color:'white', marginHorizontal:10}}>
                            {item.content}
                        </Text>
                    </ImageBackground>                        
                )}
            />
    </View>
  )
}

export default CarouselCourse

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width,
        marginBottom:30
    }
})