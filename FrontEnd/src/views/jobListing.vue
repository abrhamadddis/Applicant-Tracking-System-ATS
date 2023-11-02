<template>
    <div>   
        
        <div class=" flex justify-evenly item-center bg-gradient-to-l from-primary to-secondary mx-20 my-12 py-4  rounded-md">
            <h1 class="text-sans text-2xl text-white ">Find Job</h1>
            <div class="flex items-c">
                <div class=" pt-2 pr-10" >
                    <label class="pr-3 text-base text-white"   for="company" >Company</label>
                    <select class="pr-20 bg-white text-sans  border-4 rounded border-secondary " @change="getPosts(company)" v-model="company" >
                        <option class="active:bg-primary" value="">All Jobs</option>
                        <Option  :value="item.company" v-for="item in mainList" :key="item.id">{{ item.company }}</Option>
                    </select>
                </div>
                <div class="pt-2">
                    <label class="pr-3 text-base text-white " for="sort" >Sort</label>
                    <select class="pr-20 bg-white text-sans  border-4 rounded border-secondary" @change="getPosts(company, sort)" v-model="sort" >
                        <option value="">None</option>
                        <Option value="company">company</Option>
                        <Option value="location">Location</Option>
                    </select>
                </div>

            </div>
        </div>
        <div v-for="item in jobList" :key="item.id"  class=" bg-neutral-lightGrayishCyan my-12 mx-20  " id="dataContainer" >
            <!-- first card-->
            <div class=" flex flex-col pl-10 py-8 my-12 w-full  rounded-md bg-white md:flex-row md:justify-between shadow-lg border-primary">
            <!--left column-->
            <div class="flex flex-col md:flex-row">
                <!--image of job-->
                <div class="mr-2 rounded-full -mt-14 w-16 md:mt-0 md:w-24"> 
                <img :src="item.logo" alt="companyLogo">
                </div>
                <!--job description-->
                <div class="flex flex-col">
                <!--company title and tags-->
                <div class="flex items-center">
                    <div class="mr-1">
                    <h3 class="text-primary  font-bold mr-4 text-lg md:text-lg">{{ item.company }}</h3>
                    </div>
                    <div class="flex flex-wrap">
                    <span v-show="item.isnew"  class="bg-primary bg-primary-desaturatedDarkCyan uppercase text-white font-bold rounded-full px-4 pt-2 pb-1 text-sm mr-2">New</span>
                    <span v-show="item.featured" class="bg-secondary  uppercase text-white font-bold rounded-full px-4 pt-2 pb-1 text-sm mr-2">FEATURED</span>
                    </div>
                </div>
                <!--job title-->
                <div class="-ml-2">
                    <h2 class="font-sans  font-bold  hover:text-primary px-2 py-1 rounded-xl text-xl self-start">{{ item.position }}</h2>
                </div>
                <!--date time and location-->
                <div class="flex gap-2 text-neutral-darkGrayishCyan items-center">
                    <span>1d ago</span>
                    <span class="pb-2">.</span>
                    <span>{{ item.contract }}</span>
                    <span class="pb-2">.</span>
                    <span>{{ item.location }}</span>
                </div>
                </div>
                <div class=" py-3 mb-2 md:hidden">
                <hr class="bg-neutral-darkGrayishCyan">
                </div>
            </div>
            <!--right column-->
            <div  class="flex justify-start flex-wrap items-center  md:flex-wrap'">
                <div v-for="skill in item.languages" :key="skill" class="felx ">
                <span class="font-bold text-primary bg-neutral-lightGrayishCyan px-2 pt-2 pb-1 mr-4 rounded-md cursor-pointer hover:text-white hover:bg-primary" >{{ skill }}</span>
                <!-- <span class="font-bold text-primary bg-neutral-lightGrayishCyan px-2 pt-2 pb-1 mr-4 rounded-md cursor-pointer hover:text-white hover:bg-primary" >Senior</span>
                <span class="font-bold text-primary bg-neutral-lightGrayishCyan px-2 pt-2 pb-1 mr-4  rounded-md cursor-pointer hover:text-white hover:bg-primary " >HTML</span>
                <span class="font-bold text-primary bg-neutral-lightGrayishCyan px-2 pt-2 pb-1 mr-4  rounded-md cursor-pointer hover:text-white hover:bg-primary" >Javascript</span> -->
                </div>
            </div>
            </div>
            
        </div>
    
        <div class=" flex justify-center py-20 " >
            
            <button  @click="previousPage" class="md:block p-3 px-6 pt-2 text-white bg-primary rounded-full baseline hover:bg-brightRedLight"> Previous </button>
            <h3 class="mt-2 px-5"> Page {{ page }}</h3>
            <button   @click="nextPage" class="md:block p-3 px-6 pt-2 text-white bg-primary rounded-full baseline hover:bg-brightRedLight"> Next </button>
            
        </div>
    
        

        

    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name: 'jobListing',
        data() {
            return {
                jobList: [],
                mainList: [],
                test: false,
                company: '',
                sort: '',
                page: 1,
                limit: 4,
                totalpage: null,
            }
        },
        methods: {
             async getPosts(company, sort) {
               try{
                   const response = await axios.get(`http://localhost:8001/api/jobs/?company=${company}&sort=${sort}&limit=${this.limit}&page=${this.page}`)
                   console.log(response.data.job)
                   this.jobList = response.data.job
                   this.totalpage = response.data.totalPages
               }
               catch(error){
                console.log(error)
               }
            },
            async getMainPosts() {
               try{
                   const response = await axios.get('http://localhost:8001/api/jobs/') 
                   this.mainList = response.data.job
               }
               catch(error){
                console.log(error)
               }
            },
            convertStringToBoolean(inputString) {
                const lowerCaseStr = inputString.trim().toLowerCase();

                if (lowerCaseStr === "true") {
                    return true
                } else{
                    return false
                }
            },
            nextPage(){
                if(this.page < this.totalpage)
                {
                    this.page++;
                    this.getPosts(this.company, this.sort);
                }
                
                
            },
            previousPage(){
                if(this.page > 1){
                    this.page--;
                    this.getPosts(this.company, this.sort);
                }
                
                
            }

        },
        async created(){
            this.getPosts(this.company, this.sort)
            this.getMainPosts()
        }

    }
</script>

<style lang="scss" scoped>

</style>